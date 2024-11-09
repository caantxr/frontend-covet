import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../services/event.service';
import { CategoriesService } from '../../../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateService } from '../../../services/date.service';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './evento-edit.component.html',
  styleUrls: ['./evento-edit.component.css']
})
export class EventoEditComponent implements OnInit {
  eventForm!: FormGroup;
  categories: any = [];
  selectedId!: string;

  constructor(
    private eventService: EventService,
    private categoryService: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dateService: DateService
  ) {
    this.eventForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      date: new FormControl('', [Validators.required]),
      location: new FormControl('', Validators.required),
      capacity: new FormControl('', [Validators.required, Validators.min(1)]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(params => {
      this.selectedId = params['id'];
      this.eventService.getEventById(this.selectedId).subscribe(response => {
        
        this.eventForm.setValue({
          title: response.data.title,
          description: response.data.description,
          category: response.data.category,
          date:  '2024/09/09',
          location: response.data.location,
          capacity: response.data.capacity,
          price: response.data.price
        });
      });
    });

    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      this.eventService.updateEvent(this.selectedId, this.eventForm.value).subscribe(() => {
        this.router.navigateByUrl('/dashboard/events/list');
      });
    }
  }

}
