import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EventBookingComponent} from './components/event-booking/event-booking.component';
import {EventListingComponent} from './components/event-listing/event-listing.component';

const routes: Routes = [
  {path: 'events', component: EventListingComponent},
  {path: 'events/book', component: EventBookingComponent},
  {path: '', redirectTo: 'events', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
