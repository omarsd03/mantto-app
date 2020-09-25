import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { ModalDetalleOkService } from '../../services/modal-detalle-ok.service';
import { AlertasService } from '../../services/alertas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-realizadas',
  templateUrl: './realizadas.component.html',
  styleUrls: ['./realizadas.component.css']
})
export class RealizadasComponent implements OnInit {

  public realizadas: any = [];
  public vacio = 1;

  constructor(private actividadesService: ActividadesService, 
              private modalDetalleOk: ModalDetalleOkService, 
              private alertasService: AlertasService) { }

  ngOnInit(): void {
    this.obtenerRealizadas();
  }

  obtenerRealizadas() {

    this.alertasService.mostrarAlerta();

    this.actividadesService.obtenerRealizadas().subscribe( (resp: any) => {

      console.log(resp);

      if (resp.ok) {

        this.alertasService.cerrarAlerta();
        this.realizadas = resp.registros;

        if (this.realizadas.length > 0) {
          this.vacio = 1;
        } else {
          this.vacio = 0;
        }

      } else {
        this.alertasService.errorAlerta();
      }

    });

  }

  detalleRealizadas(folio, id_actividad, id_maquina, id_sub_maquina) {
    console.log({folio, id_actividad, id_maquina, id_sub_maquina});
    this.modalDetalleOk.abrirModal(folio, id_sub_maquina);
  }

}
