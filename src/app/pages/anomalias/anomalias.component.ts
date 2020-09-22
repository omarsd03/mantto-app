import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { ModalDetalleNokService } from '../../services/modal-detalle-nok.service';
import { AlertasService } from '../../services/alertas.service';

@Component({
  selector: 'app-anomalias',
  templateUrl: './anomalias.component.html',
  styleUrls: ['./anomalias.component.css']
})
export class AnomaliasComponent implements OnInit {

  public anomalias: any = [];
  public vacio = 1;

  constructor(private actividadesService: ActividadesService, private modalDetalleNok: ModalDetalleNokService, private alertasService: AlertasService) { }

  ngOnInit(): void {
    this.obtenerAnomalias();
  }

  obtenerAnomalias() {

    this.alertasService.mostrarAlerta();

    this.actividadesService.obtenerAnomalias().subscribe( (resp: any) => {
      
      console.log(resp);

      if (resp.ok) {
        
        this.anomalias = resp.registros;
        this.alertasService.cerrarAlerta();

        if (this.anomalias.length > 0) {
          this.vacio = 1
        } else {
          this.vacio = 0;
        }

      } else {
        this.alertasService.errorAlerta();
      }

    });

  }

  detalleAnomalias(folio, id_actividad, id_maquina, id_sub_maquina) {
    console.log({folio, id_actividad, id_maquina, id_sub_maquina});
    this.modalDetalleNok.abrirModal(folio, id_sub_maquina);
  }

}
