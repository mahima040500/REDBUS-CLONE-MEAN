import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Bus } from "../model/bus.model"
import { Booking } from '../model/booking.model';
import { url } from '../config';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private busbookapi: string = url + 'booking/'

  private apiurl: string = url + 'routes/'
  constructor(private http: HttpClient) { }
  GETBUSDETAILS(depart: string, arrival: string, date: string): Observable<Bus[]> {
    const url = `${this.apiurl}${depart}/${arrival}/${date}`;
    return this.http.get<Bus[]>(url).pipe(
      catchError(error => {
        console.error('Error fetching bus details', error);
        return throwError(() => new Error('Failed to fetch bus details'));
      })
    );
  }
addbusmongo(myBooking:any):Observable<Booking>{
  const busbook: Booking = {
    customerId:myBooking.customerId,
    passengerDetails:myBooking.passengerDetails,
    email:myBooking.email,
    phoneNumber:myBooking.phoneNumber,
    fare:myBooking.fare,
    status:myBooking.status,
    bookingDate:myBooking.bookingDate,
    busId:myBooking.busId,
    seats: myBooking.seats,
    departureDetails:myBooking.departureDetails,
    arrivalDetails:myBooking.arrivalDetails,
    duration:myBooking.duration,
    isBusinessTravel:myBooking.isBusinessTravel,
    isInsurance: myBooking.isInsurance ,
    isCovidDonated:myBooking.isCovidDonated
  };
  return this.http.post<Booking>(this.busbookapi,busbook)
}

getbusmongo(id:string):Observable<Booking[]>{
  const url=`${this.busbookapi}${id}`;
  return this.http.get<Booking[]>(url);
}

}
