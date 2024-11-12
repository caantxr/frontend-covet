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
  reservesAvailable: any
  reservesCancelled: any
  constructor (private reserveService: ReserveService, private authService: AuthService){
  }
  ngOnInit(){
    this.user = this.authService.userData;
    console.log( this.user );
    this.loadData()
  }
  cancelarReserva(id:any){
    console.log(id);
    this.reserveService.cambiarEstadoReservaId(id,"cancelled").subscribe((data)=>{
      console.log(data);
      this.loadData()
    })
  }
  loadData(){
    this.reserveService.obtenerReservasUserId(this.user._id).subscribe((data)=>{
      console.log(data);
      this.reservesAvailable=data.filter((reserve:any)=>{
        return reserve.status != 'cancelled'
      })
      this.reservesCancelled=data.filter((reserve:any)=>{
        return reserve.status == 'cancelled'
      })
    })
  }
}
