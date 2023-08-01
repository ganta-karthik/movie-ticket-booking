import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.css']
})
export class TheatersComponent {
  isLoading = false
  theaters: any[] = []
  constructor(private http: HttpClient) {
    this.isLoading = true
    const theaterName = localStorage.getItem('theater')
    this.http.get<any[]>('http://localhost:5100/theaters').subscribe((res: any) => {
      this.theaters = res.filter((theater: { name: string }) => theater.name == theaterName)
      this.isLoading = false
    })
  }
}
