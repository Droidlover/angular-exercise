import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventDetailsModel} from '../../models/event-details.model';
import {EventsHandlerService} from '../../services/events-handler.service';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {checkTicketsAvailabiityValidator} from '../../utilities/check-tickets-availabiity.directive';
import {Constants} from '../../constants/Constants';
import {Router} from '@angular/router';
import {BookingDetailsModel} from '../../models/booking-details.model';

@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.css']
})
export class EventBookingComponent implements OnInit, OnDestroy {

  selectedEvent: EventDetailsModel;
  isBookingSuccessfull = false;
  Constants = Constants;
  isFormSubmitted: boolean;
  maxSeats: any;
  private dataPosted: string;

  // FormBuilder
  eventBookingForm = this.fb.group({
    userName: ['', [
      Validators.required,
      Validators.pattern(this.Constants.VALIDATION_MESSAGES.NAME.REGEX),
    ]],
    email: ['', [
      Validators.required,
      Validators.email,
    ]],
    phoneNum: ['', [
      Validators.pattern(this.Constants.VALIDATION_MESSAGES.PHONE_NUMBER.REGEX),
    ]],
    numOfSeats: [''],
    attendeeNames: this.fb.array([])
  });


  constructor(private  router: Router,
              private eventsHandlerService: EventsHandlerService,
              private fb: FormBuilder) {
  }


  ngOnInit() {
    this.setSelectedEvent();
    this.setMaxSeats();
  }

  getAvailableEventTicketsCount() {
    if (this.selectedEvent && this.selectedEvent.numOfSeatsAvail && this.selectedEvent.numOfSeatsAvail > 0) {
      return this.selectedEvent.numOfSeatsAvail;
    } else {
      return 0;
    }
  }

  private setSelectedEvent() {
    if (this.eventsHandlerService.getSelectedEventItem()) {
      this.selectedEvent = this.eventsHandlerService.getSelectedEventItem();
      this.addValidatorsSelectedEvents();
    } else {
      this.gotoEventsPage();
    }
  }

  get attendeeNames() {
    return this.eventBookingForm.get('attendeeNames') as FormArray;
  }

  addAttendees() {
    this.attendeeNames.push(this.fb.control('', [Validators.required]));
  }

  // Set Array that can be iterated in HTML to show dropdown
  private setMaxSeats() {
    this.maxSeats = Array(Constants.MAX_SEATS_PER_PERSON).fill(1);
  }

  // Set Attendees
  setAttendeesControls(event) {
    let numOfSeats = event.target.value;
    this.attendeeNames.controls = [];
    // No need to push control in case only 1 attendee
    while (numOfSeats > 1) {
      if (+this.eventBookingForm.get('numOfSeats').value <= this.selectedEvent.numOfSeatsAvail) {
        this.addAttendees();
      }
      numOfSeats--;
    }
  }

  private addValidatorsSelectedEvents() {
    this.eventBookingForm.get('numOfSeats').setValidators(Validators.compose([
        Validators.required, checkTicketsAvailabiityValidator(this.getAvailableEventTicketsCount())
      ])
    );
  }

  submitForm() {
    this.isFormSubmitted = true;
    if (this.eventBookingForm.valid && !this.isBookingSuccessfull) {
      this.isBookingSuccessfull = true;
      this.eventBookingForm.disable();
      const finalFormToBeSubmitted: BookingDetailsModel = Object.assign({}, this.eventBookingForm.value);
      this.dataPosted = JSON.stringify(finalFormToBeSubmitted);
      console.log('<<<<<<Form Data To Be Posted>>>>>>');
      console.log(finalFormToBeSubmitted);
    }
  }

  gotoEventsPage() {
    this.router.navigate(['/events']);
  }


  // Basic code to handle and display errors. Reusable so we dont have to create divs and pollute HTML with logic -- START

  getFormControl(controlName, isArrayControl) {
    if (this.eventBookingForm && !isArrayControl) {
      return this.eventBookingForm.get(controlName) as FormControl;
    } else if (this.eventBookingForm && isArrayControl) {
      return this.eventBookingForm.get('attendeeNames').get(controlName) as FormControl;
    }
  }

  isFormControlValid(controlName, isArrayControl) {
    const currentControl: FormControl = this.getFormControl(controlName, isArrayControl);
    if (currentControl.invalid && ((currentControl.dirty || currentControl.touched) || this.isFormSubmitted)) {
      return 'is-invalid';
    } else if (currentControl.valid && (currentControl.dirty || currentControl.touched)) {
      return 'is-valid';
    }
  }

  showErrorMessages(controlName, isArrayControl) {
    if (this.eventBookingForm) {
      const currentControl: FormControl = this.getFormControl(controlName, isArrayControl);
      const controlAndVisibility = {control: currentControl, isVisible: false};
      if (currentControl.invalid && ((currentControl.dirty || currentControl.touched) || this.isFormSubmitted)) {
        controlAndVisibility.isVisible = true;
      } else if (currentControl.valid && (currentControl.dirty || currentControl.touched)) {
        controlAndVisibility.isVisible = false;
      }
      return controlAndVisibility;
    }
  }

  // Basic code to handle and display errors. Reusable so we dont have to create divs and pollute HTML with logic -- END


  ngOnDestroy() {
    this.eventsHandlerService.setSelectedEventItem(null);
  }
}
