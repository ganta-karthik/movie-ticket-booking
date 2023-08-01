import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  @ViewChild('content', { static: false }) modalContent!: TemplateRef<any>; // Add "!" to indicate it will be initialized
  @ViewChild('payment', { static: false }) paymentModal!: TemplateRef<any>;

  movieDetails: any = {}; // Initialize movieDetails as an empty object
  availableTheatres: any[] = [];
  selectedSeats: any[] = [];
  isLoading = false;
  totalPrice = 0;
  seatNumbers: any[] = [];
  selectedMethod!: string;
  paymentMethod!: string;
  theatreId!: string
  currentModal: NgbModalRef | null = null;
  rows: any[] = [];

  cardNumber: string = ''
  expirationDate: string = ''
  cvv: string = ''

  bookedSeats: any[] = [];
  reservedSeats: any[] = [];
  price = 0
  showTime!: string

  constructor(private http: HttpClient, private router: ActivatedRoute, private route: Router, private modalService: NgbModal) {
    this.isLoading = true;

    this.generateSeatRows();
    const id = this.router.snapshot.paramMap.get('id'); // Use the get() method instead of using parentheses ()
    this.http.get(`http://localhost:5100/movie/${id}`).subscribe((res: any) => { // Add the type 'any' to the response
      this.movieDetails = res;
      if (res) {
        this.isLoading = false
      }
    });

    const movieId = this.router.snapshot.paramMap.get('id');
    this.http.get<any>(`http://localhost:5100/bookings/movie/${movieId}`).subscribe((res) => {
      // console.log(res)
    })
  }

  onShowTheatres() {
    this.isLoading = true
    const id = this.router.snapshot.paramMap.get('id');
    this.http.get<any[]>(`http://localhost:5100/theaters`).subscribe((res: any) => {
      this.availableTheatres = res
      this.isLoading = false
    })
  }

  confirmBooking() {
    const response = confirm("Are you sure you want to confirm the booking?")
    if (response) {
      this.currentModal = this.modalService.open(this.paymentModal, { size: 'lg' });
    }
  }

  generateSeatRows() {
    const numRows = 10;
    const seatsPerRow = 10;
    const startingRowCharCode = 65;
    for (let i = 0; i < numRows; i++) {
      const rowNumber = String.fromCharCode(startingRowCharCode + i);
      const rowSeats = [];
      for (let j = 1; j <= seatsPerRow; j++) {
        const seatLabel = `${rowNumber}${j}`;
        rowSeats.push(seatLabel);
      }
      this.rows.push({ rowNumber, seats: rowSeats });
    }
  }

  selectSeat(seatNumber: string,) {
    if (this.selectedSeats.includes(seatNumber)) {
      this.selectedSeats = this.selectedSeats.filter(seat => seat !== seatNumber);
    } else {
      this.selectedSeats.push(seatNumber);
    }
    this.totalPrice = this.price * this.selectedSeats.length
  }

  openModal(id: string) {
    this.price = 100
    this.theatreId = id;
    const movieId = this.router.snapshot.paramMap.get('id');
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.http.get<any[]>(`http://localhost:5100/bookings/movie/${movieId}`).subscribe(
        (res) => {
          this.reservedSeats = res.filter((booking) => booking.theater_id._id === id)
            .map((booking) => booking.seat_numbers)
            .flat();
          this.modalService.open(this.modalContent, { size: 'lg' });
        },
        (error) => {
          console.error('Failed to retrieve movie bookings:', error);
        }
      );


    } else {
      this.route.navigate(['/login']);
    }
  }

  openPaymentModal() {
    this.modalService.dismissAll();
    this.modalService.open(this.paymentModal, { centered: true });
  }

  isPaymentFormValid(): boolean {
    return !!this.cardNumber && !!this.expirationDate && !!this.cvv;
  }

  onPayment() {
    let price = this.totalPrice
    const movieId = this.router.snapshot.paramMap.get('id');
    const userId = localStorage.getItem('userId')
    const bookingDetails = {
      user_id: userId,
      movie_id: movieId,
      theater_id: this.theatreId,
      total_price: this.totalPrice,
      seat_numbers: this.selectedSeats,
      payment_method: this.selectedMethod,
      payment_status: 'success'
    }
    this.http.post('http://localhost:5100/bookings', bookingDetails).subscribe((res) => {
      console.log(res)
    })

    alert(`Payment Successful of ${price}`)
    this.modalService.dismissAll();
  }
}
