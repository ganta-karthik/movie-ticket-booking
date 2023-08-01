import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent {
  formData: any = {}; // Declare an object to store form data
  theatreFormData: any = {};

  constructor(private http:HttpClient){}

  onSubmit() {
    // Handle form submission logic
    console.log(this.formData); // Example: Log the form data
    this.http.post('http://localhost:5100/movies',this.formData).subscribe((res) => {
      console.log(res)
      alert('Flight Added.')
    })
  }

  onSubmitTheatreData(){
    console.log(this.theatreFormData); // Example: Log the form data
    this.http.post('http://localhost:5100/theaters',this.theatreFormData).subscribe((res) => {
      console.log(res)
      alert('Flight Added.')
    })
  }
}
