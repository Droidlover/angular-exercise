import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventsHandlerService} from '../../services/events-handler.service';
import {EventDetailsModel} from '../../models/event-details.model';
import {Constants} from '../../constants/Constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.css']
})
export class EventListingComponent implements OnInit {

  eventList: EventDetailsModel[];
  searchText: string;
  Constants = Constants;

  constructor(private http: HttpClient,
              private eventsHandlerService: EventsHandlerService,
              private router: Router) {
  }

  ngOnInit() {
    this.getEventListAndInit();

  }

  private getEventListAndInit() {
    this.eventsHandlerService.getEventList().subscribe((resp: EventDetailsModel[]) => {
      this.eventList = resp;
    });
  }

  isTicketAvailable(event: EventDetailsModel) {
    if (event.numOfSeatsAvail > 0) {
      return true;
    } else {
      return false;
    }
  }

  bookTicket(event: EventDetailsModel) {
    this.eventsHandlerService.setSelectedEventItem(event);
    this.router.navigate(['events/book']);
  }

}
