import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data['requiredRole'];

  return authService.verifyUser()
    .pipe(
      tap( ( userData:any ) => {

        console.log(userData);
        console.log(requiredRole);

        // Si no trae role
        if (!userData || !userData.role) {
          router.navigateByUrl('home');
          return false;
        }

        // Si trae role: valida el rol
        const hasRequiredRole = typeof requiredRole === 'string'
          ? userData.role === requiredRole                              // como un string
          : requiredRole.some((role:any) => role === userData.role);    // como una lista de strings

        // Si el rol es el requerido
        if (hasRequiredRole) {
          return true;    // Da el acceso
        }
        else {
          // Si no es el requerido
          router.navigateByUrl('home');   // redirecciona
          return false;                   // Quita el acceso
        }
      })
    );
};
