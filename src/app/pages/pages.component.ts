import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../services/notificaciones.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private notificaciones: NotificacionesService) { }

  ngOnInit(): void {
    this.notificaciones.permisosNotificaciones()
  }

}
