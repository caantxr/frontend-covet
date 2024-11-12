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
  obtenerReservas(){
    return this.http.get <any> ('http://localhost:4000/api/reservations')
  }
  obtenerReservasUserId(id:any){
    return this.http.get <any> (`http://localhost:4000/api/reservations/user/${id}`)
  }
}
