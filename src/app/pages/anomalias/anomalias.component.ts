import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { ModalDetalleNokService } from '../../services/modal-detalle-nok.service';

@Component({
  selector: 'app-anomalias',
  templateUrl: './anomalias.component.html',
  styleUrls: ['./anomalias.component.css']
})
export class AnomaliasComponent implements OnInit {

  public anomalias: any = [];

  constructor(private actividadesService: ActividadesService, private modalDetalleNok: ModalDetalleNokService) { }

  ngOnInit(): void {
    this.obtenerAnomalias();
  }

  obtenerAnomalias() {

    this.actividadesService.obtenerAnomalias().subscribe( (resp: any) => {
      console.log(resp);
      this.anomalias = resp.registros;
    })

  }

  detalleAnomalias(folio, id_actividad, id_maquina, id_sub_maquina) {
    console.log({folio, id_actividad, id_maquina, id_sub_maquina});
    this.modalDetalleNok.abrirModal(folio, id_sub_maquina);
  }

}
