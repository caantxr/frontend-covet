import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faCircleQuestion, faGear, faArrowRightFromBracket, faChampagneGlasses, faInbox, faTicket, faSpa,faHouse, faBars} from '@fortawesome/free-solid-svg-icons';
import { EventService } from '../../../services/event.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  events:any;
  isActive = false;
  constructor(private eventService : EventService){

  }
  ngOnInit (){
    this.eventService.getEvents().subscribe((data)=>{
      console.log(data);
      this.events = data.data
    })
  }
  toggleSidebar() {
    this.isActive = !this.isActive;
  }

  faPlus = faPlus
  faCircleQuestion = faCircleQuestion
  faGear = faGear
  faArrowRightFromBracket = faArrowRightFromBracket
  faChampagneGlasses = faChampagneGlasses
  faInbox = faInbox
  faTicket = faTicket
  faHouse = faHouse
  faBars = faBars
  faSpa = faSpa

  delete(id:any){

  }

  edit(id:any){

  }
}
