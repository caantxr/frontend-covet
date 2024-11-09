import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],  // Agrega CommonModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData!: FormGroup;

  constructor(private authservice: AuthService) {
    this.formData = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    });
  }

  onSubmit() {
    if(this.formData.valid) {
      console.log(this.formData.value);
      this.authservice.registerUser(this.formData.value).subscribe((data)=>{
        console.log(data);
      })
      
    }
    this.formData.reset()
  }

}

