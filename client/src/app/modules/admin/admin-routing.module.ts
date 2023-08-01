import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { HomeComponent } from './components/home/home.component';
import { AddFilmComponent } from './components/add-film/add-film.component';
import { UsersComponent } from './components/users/users.component';
import { TheatersComponent } from './components/theaters/theaters.component';

const routes: Routes = [
  {path:'',component:HomeComponent,
    children: [
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'bookings',
        component:BookingsComponent
      },
      {
        path:'theaters',
        component:TheatersComponent
      },
      {
        path:'add-film-or-theater',
        component:AddFilmComponent
      },
      {
        path:'users',
        component:UsersComponent
      },
      {
        path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
