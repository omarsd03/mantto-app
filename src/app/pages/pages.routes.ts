import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ActividadComponent } from './actividad/actividad.component';
import { AnomaliasComponent } from './anomalias/anomalias.component';
import { RealizadasComponent } from './realizadas/realizadas.component';
import { HistoricoComponent } from './historico/historico.component';


const pagesRoutes: Routes = [
    { path: '', component: HomeComponent, /*canActivate: [AuthGuard]*/ },
    { path: 'actividades/:id', component: ActividadesComponent, /*canActivate: [AuthGuard]*/ },
    { path: 'actividad/:id', component: ActividadComponent, /*canActivate: [AuthGuard]*/ },
    { path: 'anomalias', component: AnomaliasComponent, /*canActivate: [AuthGuard]*/ },
    { path: 'realizadas', component: RealizadasComponent, /*canActivate: [AuthGuard]*/ },
    { path: 'historico', component: HistoricoComponent, /*canActivate: [AuthGuard]*/ }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
