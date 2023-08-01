import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BookingsComponent } from './components/bookings/bookings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './components/users/users.component';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { AddFilmComponent } from './components/add-film/add-film.component';
import { TheatersComponent } from './components/theaters/theaters.component';


@NgModule({
  declarations: [
    DashboardComponent,
    BookingsComponent,
    HomeComponent,
    UsersComponent,
    LoaderSpinnerComponent,
    AddFilmComponent,
    TheatersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
