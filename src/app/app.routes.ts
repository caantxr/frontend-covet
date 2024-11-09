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


export const routes: Routes = [
    {
        path: "login",  component: LoginComponent  
    },
    {
        path: "register", component: RegisterComponent
    },
    {
        path: "home", component: InicioComponent
    },
    {
        path: "main", component: MainComponent
    },
    {
        path: "dashboard/profile", component: ProfileComponent
    },
    {
        path: "register/business", component: BusinessComponent
    },
    
    {
        path: "dashboard/my-events", component: EventPageComponent
    },
    {
        path: "dashboard/reserves", component: ReservesPageComponent
    },
    {
        path: "dashboard/events/list", component: EventListComponent
    },
    {
        path: "dashboard/event/register", component: EventoComponent
    },
    {
        path: "help", component: HelpComponent
    },
    {
        path: "dashboard/event/edit/:id" , component: EventoEditComponent
    },
    {
        path: '', redirectTo: 'home', pathMatch:'full'
    },
    {
        path: '**', component:PagenotfoundComponent

    }
];
