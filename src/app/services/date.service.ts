import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

// Convertir ISO a objeto Date sin cambiar la zona horaria
convertISOToDateObject(isoDate: string): Date {
  const date = new Date(isoDate);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Solo año, mes y día
}

// Convertir objeto Date a formato "yyyy-MM-dd" (compatible con <input type="date">)
convertToDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes 0-11, por eso sumamos 1
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`; // Formato "yyyy-MM-dd"
}
obtenerFechaActual() {
  const fecha = new Date();

  const año = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Meses van de 0 a 11, por eso sumamos 1 y rellenamos con 0 si es necesario
  const dia = fecha.getDate().toString().padStart(2, '0');

  const fechaFormateada = `${mes}/${dia}/${año}`;

  return fechaFormateada;
}
}
