import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUserData: any = null;

  constructor(private http: HttpClient) { }

  /** Getters */
  get userData(): any {
    const storedData = localStorage.getItem('authUserData');

    // Verifica si storedData no es null ni undefined, además si el contenido es válido JSON
    return this._authUserData || ( storedData && storedData !== 'undefined' ? JSON.parse(storedData) : null);
  }

  registerBusiness(newBusiness: any) {
    return this.http.post<any>('http://localhost:4000/api/auth/register/business', newBusiness);
  }

  registerUser(newUser: any) {
    return this.http.post<any>('http://localhost:4000/api/auth/register', newUser);
  }

  loginUser(credentials: { email: string; password: string }) {
    return this.http.post<any>('http://localhost:4000/api/auth/login', credentials)
    .pipe(
      tap( data => {

        if( data.token ) {

          // Verifica si los datos del usuario existen y no son undefined
          if( data.data ) {
            console.log('Datos del usuario a guardar:', data.data); // <-- Agrega este console.log para depurar
            this._authUserData = data.data;  // En el servicio
            localStorage.setItem( 'authUserData', JSON.stringify(data.data)); // En localStorage
          }

          // Guarda el Token
          localStorage.setItem( 'token', data.token );
        }

      }),
      map( data => {
        if( ! data.ok ) {
          return data.msg;
        }

        return data.ok;
      }),
      catchError( error => of ( 'Error en el servidor' ) )
    );
}

logoutUser(): Observable<boolean> {
  console.log( 'logout', this._authUserData );

  this._authUserData = null;                  // Elimina datos del usuario autenticado en el Servicio
  localStorage.removeItem( 'token' );         // Elimina token del LocalStorage
  localStorage.removeItem( 'authUserData' );  // Elimina datos del usuario autenticado en el LocalStorage

  return of( true );
}

// TODO: Verificar cuando se vence el Token para que el guard limpie el localStorate y redireccione al login
verifyUser () {
  const token = localStorage.getItem( 'token' ) || '';
  const headers = new HttpHeaders().set( 'X-Token', token );

  console.log( token );

  return this.http.get<Response>('http://localhost:4000/api/auth/re-new-token', { headers } )
    .pipe (
      tap ((data)=>{
        console.log(data)
      }),
      map((data)=>{
        console.log( 'verifyUser: ', data.ok );

        return data.ok
      }),
      catchError ((data) =>{
        return of (false)
      })
    );

}
  }

