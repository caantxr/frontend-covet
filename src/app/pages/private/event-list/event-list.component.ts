import { Component } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash,  faTicket} from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, RouterLink],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  events:any;
  faTrash = faTrash;
  faTicket= faTicket;
  constructor(private eventservice: EventService){

  }

  edit(id:any){
    console.log("edita" + id);
  }

  
  delete(id:any){
    this.eventservice.deleteEvent(id).subscribe((data)=>{
    console.log(data)
    this.cargarDatos()
  
  }
)
}

  ngOnInit(){
    this.cargarDatos()
  }

  cargarDatos(){
    this.eventservice.getEvents().subscribe((data)=>{
      console.log(data);
      this.events = data.data
    })

  }

}
