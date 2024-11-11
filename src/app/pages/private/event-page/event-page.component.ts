import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent {
  event : any
  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService){
  
}
ngOnInit(){
  this.activatedRoute.params.subscribe((data)=>{
    console.log(data);
    this.eventService.getEventById(data['id']).subscribe((data)=>{
      console.log(data);
      this.event = data.data
    })
  })
}
}
