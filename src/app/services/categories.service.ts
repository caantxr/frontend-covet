import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token') || '';
    this.headers = new HttpHeaders().set('X-Token', token);
  }
  // Obtener categorías
  getCategories() {
    return this.http.get<any>('http://localhost:4000/api/categories');
  }

  // Crear una nueva categoría
  createCategory(category: any) {
    return this.http.post<any>('http://localhost:4000/api/categories', category, {headers: this.headers});
  }

  // Eliminar una categoría
  deleteCategory(id: string) {
    return this.http.delete<any>(`http://localhost:4000/api/categories/${id}`, {headers: this.headers});
  }
}
