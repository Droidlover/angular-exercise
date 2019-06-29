import {Injectable} from '@angular/core';
import {Constants} from '../constants/Constants';
import {HttpClient} from '@angular/common/http';
import {EventDetailsModel} from '../models/event-details.model';

@Injectable({
  providedIn: 'root'
})
export class EventsHandlerService {

  private selectedEventItem: EventDetailsModel;

  constructor(private http: HttpClient) {
  }

  getEventList() {
    const getEventListUrl = Constants.API_URI_PREFIX + Constants.API_URI_SUFFIX.GET_EVENT_LIST;
    return this.http.get<EventDetailsModel[]>(getEventListUrl);
  }

  getSelectedEventItem(): EventDetailsModel {
    return this.selectedEventItem;
  }

  setSelectedEventItem(value: EventDetailsModel) {
    this.selectedEventItem = value;
  }


}
