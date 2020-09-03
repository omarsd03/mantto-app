import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { ModalDetalleNokService } from '../../services/modal-detalle-nok.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pendientes: any = [];
  
  public role: any = localStorage.getItem('role');

  constructor(private actividadesService: ActividadesService, private modalDetalleNokService: ModalDetalleNokService) {
    console.log(':D');
  }

  ngOnInit(): void {
    this.obtenerPendientes();
  }
  
  obtenerPendientes() {

    this.actividadesService.obtenerPendientes().subscribe((resp: any) => {
      console.log(resp);
      this.pendientes = resp.registros;
    });

  }

  detalleAnomalia(folio: string, id_maquina: number, id_sub_maquina: number) {
    this.modalDetalleNokService.abrirModal(folio, id_maquina, id_sub_maquina);
  }

}
