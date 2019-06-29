import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventDetailsModel} from '../../models/event-details.model';
import {EventsHandlerService} from '../../services/events-handler.service';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {checkTicketsAvailabiityValidator} from '../../utilities/check-tickets-availabiity.directive';
import {Constants} from '../../constants/Constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.css']
})
export class EventBookingComponent implements OnInit {

  selectedEvent: EventDetailsModel;
  isBookingSuccessfull = false;
  Constants = Constants;
  isFormSubmitted;
  eventBookingForm = this.fb.group({
    userName: ['', [
      Validators.required,
      Validators.pattern(this.Constants.VALIDATION_MESSAGES.ALPHA_NUMERIC.REGEX),
    ]],
    email: ['', [
      Validators.required,
      Validators.email,
    ]],
    phoneNum: ['', [
      Validators.pattern(this.Constants.VALIDATION_MESSAGES.PHONE_NUMBER.REGEX)
    ]],
    numOfSeats: [''],
    attendeeNames: this.fb.array([])
  });
  maxSeats: any;

  constructor(private  router: Router,
              private eventsHandlerService: EventsHandlerService,
              private fb: FormBuilder) {
  }


  ngOnInit() {
    this.setSelectedEvent();
    this.setMaxSeats();
  }

  getAvailableEventTickets() {
    if (this.selectedEvent && this.selectedEvent.numOfSeatsAvail && this.selectedEvent.numOfSeatsAvail > 0
    ) {
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

  private setMaxSeats() {
    this.maxSeats = Array(Constants.MAX_SEATS_PER_PERSON).fill(1);
  }

  setSeatsToBeBooked(event) {
    let numOfSeats = event.target.value;
    this.attendeeNames.controls = [];
    while (numOfSeats > 0) {
      if (+this.eventBookingForm.get('numOfSeats').value <= this.selectedEvent.numOfSeatsAvail) {
        this.addAttendees();
      }
      numOfSeats--;
    }
  }

  private addValidatorsSelectedEvents() {
    this.eventBookingForm.get('numOfSeats').setValidators(Validators.compose([
        Validators.required, checkTicketsAvailabiityValidator(this.getAvailableEventTickets())
      ])
    );
  }

  submitForm() {
    this.isFormSubmitted = true;
    if (this.eventBookingForm.valid && !this.isBookingSuccessfull) {
      this.isBookingSuccessfull = true;
      this.eventBookingForm.disable();
      const finalFormToBeSubmitted = Object.assign({}, this.eventBookingForm.value);
      console.log('<<<<<<Form Data To Be Posted>>>>>>');
      console.log(finalFormToBeSubmitted);
    }
  }

  gotoEventsPage() {
    this.router.navigate(['/events']);
  }

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

}
