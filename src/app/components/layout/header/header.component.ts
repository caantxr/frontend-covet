import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  user: any

  constructor(private router: Router, private authService: AuthService){
    console.log( 'Header' );
  }

  get authUser() {
    return this.user;
  }

  ngOnInit(): void {
    console.log( 'Header' );
    this.user = this.authService.userData;
    console.log( this.user );
  }

  navegar() {
    this.router.navigate(['login']);
  }

}
