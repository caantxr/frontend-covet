import { Routes } from '@angular/router';
import { LoginComponent } from './pages/public/login/login.component';
import { RegisterComponent } from './pages/public/register/register.component';
import { EventoComponent } from './pages/private/evento/evento.component';
import { ProfileComponent } from './profile/profile.component';
import { InicioComponent } from './pages/public/inicio/inicio.component';
import { PagenotfoundComponent } from './pages/public/pagenotfound/pagenotfound.component';
import { BusinessComponent } from './pages/public/business/business.component';
import { EventPageComponent } from './pages/private/event-page/event-page.component';
import { ReservesPageComponent } from './pages/private/reserves-page/reserves-page.component';
import { MainComponent } from './pages/private/main/main.component';
import { EventListComponent } from './pages/private/event-list/event-list.component';
import { EventoEditComponent } from './pages/private/evento-edit/evento-edit.component';
import { HelpComponent } from './pages/public/help/help.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "home",
    component: InicioComponent
  },
  {
    path: "help",
    component: HelpComponent
  },
  {
    path: "main",
    component: MainComponent,
    canActivate: [ authGuard ],
    data: { requiredRole: 'business-owner' }
  },
  {
    path: "register/business",
    component: BusinessComponent
  },
  {
    path: "dashboard/profile",
    component: ProfileComponent,
    canActivate: [ authGuard ],
    data: { requiredRole: [ 'super-admin', 'admin', 'business-owner', 'business-admin', 'business-employee', 'registered' ] }
  },
  {
    path: "dashboard/my-events",
    component: EventPageComponent,
    data: { requiredRole: [ 'business-owner', 'business-admin', 'business-employee' ] }
  },
  {
    path: "dashboard/reserves",
    component: ReservesPageComponent,
    canActivate: [ authGuard ],
    data: { requiredRole: [ 'business-owner', 'business-admin', 'business-employee' ] }
  },
  {
    path: "dashboard/events/list",
    component: EventListComponent,
    canActivate: [ authGuard ],
    data: { requiredRole: [ 'business-owner', 'business-admin', 'business-employee' ] }
  },
  {
    path: "dashboard/event/register",
    component: EventoComponent,
    canActivate: [ authGuard ],
    data: { requiredRole: [ 'business-owner', 'business-admin' ] }
  },
  {
    path: "dashboard/event/edit/:id",
    component: EventoEditComponent,
    canActivate: [ authGuard ],
    data: { requiredRole: [ 'business-owner', 'business-admin' ] }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];
