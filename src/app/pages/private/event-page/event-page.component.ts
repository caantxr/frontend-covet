import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReserveService } from '../../../services/reserve.service';
import { DateService } from '../../../services/date.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent {
  event: any
  formData!: FormGroup;
  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService, private reserveService: ReserveService, private dateService: DateService, private authService: AuthService) {
    this.formData = new FormGroup({
      //propiedades usuario
      numberOfTickets: new FormControl(0, [Validators.required, Validators.min(1)]),

    });
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((data: any) => {
      console.log(data);
      this.eventService.getEventById(data['id']).subscribe((data: any) => {
        console.log(data);
        this.event = data.data
      })
    })
  }
  onSubmit() {
    if (this.formData.valid) {
      console.log(this.formData.value);

// to do validar reservas con la capacidad del evento
      const dataReserve = {
        userId: this.authService.userData._id,
        eventId: this.event._id,

        numberOfTickets: this.formData.value.numberOfTickets,

        reservationDate: this.dateService.obtenerFechaActual()
      }
      console.log(dataReserve);
      this.reserveService.registrarReserva(dataReserve).subscribe((data) => { console.log(data); })
    }
  }
}





