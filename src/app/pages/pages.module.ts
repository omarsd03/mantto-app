import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';

import { ActividadesComponent } from './actividades/actividades.component';
import { HomeComponent } from './home/home.component';
import { RealizadasComponent } from './realizadas/realizadas.component';
import { ActividadComponent } from './actividad/actividad.component';
import { HistoricoComponent } from './historico/historico.component';
import { AnomaliasComponent } from './anomalias/anomalias.component';
import { AccionesComponent } from './acciones/acciones.component';



@NgModule({
  declarations: [ActividadesComponent, HomeComponent, RealizadasComponent, ActividadComponent, HistoricoComponent, AnomaliasComponent, PagesComponent, AccionesComponent],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    PAGES_ROUTES
  ]
})
export class PagesModule { }
