import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const router = inject ( Router );

  // const requiredRole = route.data[ 'requiredRole' ];

  return authService.verifyUser()
  .pipe(
    tap( data => {
      console.log( 'authGuard: ', data );

      if ( ! data )
        router.navigateByUrl( 'home' );

    })
  );

  return true;
};
