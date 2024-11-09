import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http:HttpClient) { }

  getcities(){
    return this.http.get<any>('https://api-colombia.com/api/v1/City/pagedList?Page=1&PageSize=360')
  }

}
