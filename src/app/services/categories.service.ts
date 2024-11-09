import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get<any>('http://localhost:4000/api/categories')
  }
}
