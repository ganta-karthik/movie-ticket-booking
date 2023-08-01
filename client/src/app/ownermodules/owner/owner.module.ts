import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { ComponentsComponent } from './components/components.component';
import { HomeComponent } from './components/home/home.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { TheatersComponent } from './components/theaters/theaters.component';


@NgModule({
  declarations: [
    ComponentsComponent,
    HomeComponent,
    BookingsComponent,
    LoaderSpinnerComponent,
    TheatersComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule
  ]
})
export class OwnerModule { }
