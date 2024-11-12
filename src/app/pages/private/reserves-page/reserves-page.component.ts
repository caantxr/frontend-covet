import { Component } from '@angular/core';
import { ReserveService } from '../../../services/reserve.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserves-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reserves-page.component.html',
  styleUrl: './reserves-page.component.css'
})
export class ReservesPageComponent {
  user: any
  reserves: any
  constructor (private reserveService: ReserveService, private authService: AuthService){
  }
  ngOnInit(){
    this.user = this.authService.userData;
    console.log( this.user );
    this.reserveService.obtenerReservasUserId(this.user._id).subscribe((data)=>{
      console.log(data);
      this.reserves=data
    })
  }
  cancelarReserva(id:any){console.log(id);}
}
