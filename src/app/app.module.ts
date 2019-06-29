import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EventListingComponent} from './components/event-listing/event-listing.component';
import {EventBookingComponent} from './components/event-booking/event-booking.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FilterPipe} from './utilities/filter.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CheckTicketsAvailabiityDirective } from './utilities/check-tickets-availabiity.directive';
import { AddErrorViewComponent } from './components/add-error-view/add-error-view.component';

@NgModule({
  declarations: [
    AppComponent,
    EventListingComponent,
    EventBookingComponent,
    FilterPipe,
    CheckTicketsAvailabiityDirective,
    AddErrorViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
