import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'; 
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { 


    this.formData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      console.log('Form Data:', this.formData.value);
      this.authService.loginUser(this.formData.value).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.router.navigateByUrl("main")
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
        }
      });
    }
  }
}


