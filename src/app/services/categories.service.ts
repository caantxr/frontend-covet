import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  // Obtener categorías
  getCategories() {
    return this.http.get<any>('http://localhost:4000/api/categories');
  }

  // Crear una nueva categoría
  createCategory(category: any) {
    return this.http.post<any>('http://localhost:4000/api/categories', category);
  }

  // Eliminar una categoría
  deleteCategory(id: string) {
    return this.http.delete<any>(`http://localhost:4000/api/categories/${id}`);
  }
}
