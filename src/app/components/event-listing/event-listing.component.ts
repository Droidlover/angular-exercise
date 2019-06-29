import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventsHandlerService} from '../../services/events-handler.service';
import {EventDetailsModel} from '../../models/event-details.model';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Constants} from '../../constants/Constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.css']
})
export class EventListingComponent implements OnInit {

  eventList: EventDetailsModel[];
  dispCols; // Desktop Default
  searchText: string;
  Constants = Constants;

  constructor(private http: HttpClient,
              private eventsHandlerService: EventsHandlerService,
              private breakpointObserver: BreakpointObserver,
              private router: Router) {
  }

  ngOnInit() {
    this.observeScreenBreakPoints();
    this.getEventListAndInit();

  }

  private getEventListAndInit() {
    this.eventsHandlerService.getEventList().subscribe((resp: EventDetailsModel[]) => {
      this.eventList = resp;
    });
  }

  private observeScreenBreakPoints() {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
    ]).subscribe(result => {
      if (result.matches) {
        this.activateHandsetLayout();
      } else {
        this.activateDesktopLayout();
      }
    });
  }

  private activateHandsetLayout() {
    this.dispCols = 1;
  }

  private activateDesktopLayout() {
    this.dispCols = 4;
  }

  bookTicket(event: EventDetailsModel) {
    this.eventsHandlerService.setSelectedEventItem(event);
    this.router.navigate(['events/book']);
  }

  isTicketAvailable(event: EventDetailsModel) {
    if (event.numOfSeatsAvail > 0) {
      return true;
    } else {
      return false;
    }
  }

}
