import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { ModalDetalleNokService } from '../../services/modal-detalle-nok.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AlertasService } from '../../services/alertas.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pendientes: any = [];
  public vacio = 1;
  
  public role: any = localStorage.getItem('role');

  constructor(private actividadesService: ActividadesService, private alertasService: AlertasService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerPendientes();
  }
  
  obtenerPendientes() {

    this.alertasService.mostrarAlerta();

    this.actividadesService.obtenerPendientes().subscribe( (resp: any) => {

      console.log(resp);
      
      if (resp.ok) {

        this.pendientes = resp.registros;

        if (this.pendientes.length > 0) {
          this.vacio = 1;
        } else {
          this.vacio = 0;
        }

        this.alertasService.cerrarAlerta();

      } else {
        this.alertasService.errorAlerta();
      }

    });

  }

  detalleAnomalia(folio: string, id_maquina: number, id_sub_maquina: number) {

    console.log('Abrir Lector de QR');
    this.router.navigate([`/actividad/${id_sub_maquina}`, { folio: folio }]);

  }

}
