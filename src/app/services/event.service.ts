import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token') || '';
    this.headers = new HttpHeaders().set('X-Token', token);
  }

  eventRegister(newevent: any) {
    return this.http.post<any>('http://localhost:4000/api/events/register', newevent, { headers: this.headers });
  }

  getEvents() {
    return this.http.get<any>('http://localhost:4000/api/events');
  }

  deleteEvent(id: string) {
    return this.http.delete<any>(`http://localhost:4000/api/events/${id}`, { headers: this.headers });
  }

  getEventById(id: string) {
    return this.http.get<any>(`http://localhost:4000/api/events/${id}`);
  }

  updateEvent(id: string, updatedEvent: any) {
    return this.http.patch<any>(`http://localhost:4000/api/events/${id}`, updatedEvent, { headers: this.headers });
  }
}
