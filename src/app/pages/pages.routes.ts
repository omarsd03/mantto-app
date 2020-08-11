import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ActividadComponent } from './actividad/actividad.component';
import { AnomaliasComponent } from './anomalias/anomalias.component';
import { RealizadasComponent } from './realizadas/realizadas.component';
import { HistoricoComponent } from './historico/historico.component';

const pagesRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'actividades', component: ActividadesComponent },
    { path: 'actividad/:id', component: ActividadComponent },
    { path: 'anomalias', component: AnomaliasComponent },
    { path: 'realizadas', component: RealizadasComponent },
    { path: 'historico', component: HistoricoComponent }
]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);