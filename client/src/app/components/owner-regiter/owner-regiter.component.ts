import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-regiter',
  templateUrl: './owner-regiter.component.html',
  styleUrls: ['./owner-regiter.component.css']
})
export class OwnerRegiterComponent {
  regForm: FormGroup;

  constructor(private http: HttpClient, private route: Router) {
    this.regForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
    const jwtToken = localStorage.getItem('adminJwtToken')
    if (jwtToken) {
      this.route.navigate(['/admin/dashboard'])
    }
    const token = localStorage.getItem("jwtToken")
    if (token) {
      this.route.navigate(['/'])
    }
  }

  onSubmit(details: {  name: string, email: string, password: string }): void {
    this.http.post('http://localhost:5100/theater-owner/register', details).subscribe(
      (response) => {
        window.alert('Airline Registered Successfully!');
        this.route.navigate(['/theater-login']);
      },
      (error) => {
        if (error.status === 400) {
          window.alert('Theater already exists');
        } else {
          window.alert('Registration Failed!');
        }
        console.log(error);
      }
    );
  }

}
