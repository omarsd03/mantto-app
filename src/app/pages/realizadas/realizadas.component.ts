import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { ModalDetalleOkService } from '../../services/modal-detalle-ok.service';

@Component({
  selector: 'app-realizadas',
  templateUrl: './realizadas.component.html',
  styleUrls: ['./realizadas.component.css']
})
export class RealizadasComponent implements OnInit {

  public realizadas: any = [];

  constructor(private actividadesService: ActividadesService, private modalDetalleOk: ModalDetalleOkService) { }

  ngOnInit(): void {
    this.obtenerRealizadas();
  }

  obtenerRealizadas() {

    this.actividadesService.obtenerRealizadas().subscribe( (resp: any) => {
      console.log(resp);
      this.realizadas = resp.registros;
    });

  }

  detalleRealizadas(folio, id_actividad, id_maquina, id_sub_maquina) {
    console.log({folio, id_actividad, id_maquina, id_sub_maquina});
    this.modalDetalleOk.abrirModal(folio, id_sub_maquina);
  }

}
