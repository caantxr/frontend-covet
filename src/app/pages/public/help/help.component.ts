
import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {

  contactSupport() {
    alert("Gracias por contactarnos. Nuestro equipo se pondrá en contacto contigo pronto.");
  }

}