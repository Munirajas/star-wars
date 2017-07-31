import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PlanetComponent } from './planet/planet.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'planet', component: PlanetComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);