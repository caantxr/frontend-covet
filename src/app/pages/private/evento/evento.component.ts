import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../services/event.service';
import { CategoriesService } from '../../../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent {
  eventForm!: FormGroup;
  categories: any;

  constructor(private eventService: EventService, private categoryService: CategoriesService, private router:Router) {
    this.eventForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category : new FormControl ('', Validators.required),
      date: new FormControl('', Validators.compose([Validators.required, this.dateValidator])),
      location: new FormControl('', Validators.required),
      capacity: new FormControl('', [Validators.required, Validators.min(1)]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
    });

  //   {
  //     "title": "Perreo al suelo",
  //     "description": "farra",
  //     "category":"672d4f7cdf4b54766aec54bb",
  //     "date": "9/12/2024",
  //     "location": "santa lucia",
  //     "capacity": "50",
  //     "price": "12000"
  // }

  }

  // Custom validator to ensure the date is not in the past
  dateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Set today's date to midnight for accurate comparison

    return selectedDate < today ? { pastDate: true } : null;
  }

  ngOnInit(){
    this.categoryService.getCategories().subscribe((data)=>{
      console.log(data.data);
      this.categories=data.data;
    })
  }

  onSubmit() {
    if (this.eventForm.valid) {
      console.log(this.eventForm.value);
      this.eventService.eventRegister(this.eventForm.value).subscribe((data)=>{
        console.log(data);
        this.router.navigateByUrl("dashboard/events/list");
      });
    }

    this.eventForm.reset();
  }
}
