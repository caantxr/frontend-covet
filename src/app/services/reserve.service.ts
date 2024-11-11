import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  constructor(private http:HttpClient) { }
  registrarReserva(newReserve: any){
    return this.http.post <any> ('http://localhost:4000/api/reservations', newReserve)
  }
}
