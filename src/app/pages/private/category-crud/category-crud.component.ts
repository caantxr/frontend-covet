import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../../../services/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-crud',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category-crud.component.html',
  styleUrls: ['./category-crud.component.css']
})
export class CategoryCrudComponent implements OnInit {
  categories: any[] = [];
  categoryForm: FormGroup;

  constructor(private categoriesService: CategoriesService) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      description: new FormControl('', [Validators.maxLength(200)])
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  // Cargar categorías desde el servicio
  loadCategories() {
    this.categoriesService.getCategories().subscribe(
      response => this.categories = response.data,
      error => console.error('Error al cargar categorías:', error)
    );
  }

  // Crear una nueva categoría
  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoriesService.createCategory(this.categoryForm.value).subscribe(
        (data) => {
          console.log(data);
          this.loadCategories();
          this.categoryForm.reset();
        }
      );
    }
  }

  // Eliminar una categoría por ID
  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id).subscribe(
      (data)=>{console.log(data);
        this.loadCategories()
      }
    );
  }
}
