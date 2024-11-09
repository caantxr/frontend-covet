import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitiesService } from '../../../services/cities.service';
import { AuthService,  } from '../../../services/auth.service';

@Component({
  selector: 'app-business',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css'],
})
export class BusinessComponent {
  formData!: FormGroup;
  ciudades: any[] = [];

  constructor(
    private cities: CitiesService,
    private authService: AuthService
  ) {

    this.formData = new FormGroup({
      //propiedades usuario
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      //propiedades negocio
      nameBussiness: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      emailBussiness: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
    });
  }

  ngOnInit() {
    this.cities.getcities().subscribe((data) => {
      console.log(data, 'ciudades');
      this.ciudades = data.data;
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      //DESESCTRUCURAR DATOS DEL FORMULARIO
      const {
        name,
        email,
        password,
        nameBussiness,
        description,
        address,
        postalCode,
        city,
        emailBussiness,
        phone,
      } = this.formData.value;

      //OBJETO A REGISTRAR
      const businessData = {
        //USER PROPERTIES
        name,
        email,
        password,
        //business properties
        business: {
          name: nameBussiness,
          description,
          location: {
            address,
            city,
            postalCode,
          },
          contact: {
            email: emailBussiness,
            phone,
          },
        },
      };

      this.authService.registerBusiness(businessData).subscribe((data)=>{
        console.log(data);
      })
    }
    this.formData.reset();
  }
}
