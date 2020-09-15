import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { ModalDetalleNokService } from '../../services/modal-detalle-nok.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pendientes: any = [];
  
  public role: any = localStorage.getItem('role');

  constructor(private actividadesService: ActividadesService, private modalDetalleNokService: ModalDetalleNokService, private router: Router) {
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

    console.log('Abrir Lector de QR');
    this.router.navigate([`/actividad/${id_sub_maquina}`, { folio: folio }]);

    // if (this.role == 'Interceptor') {
    //   this.modalDetalleNokService.abrirModal(folio, id_maquina, id_sub_maquina);
    // } else {
    //   console.log('Abrir Lector de QR');
    //   this.router.navigate([`/actividad/${id_sub_maquina}`, { folio: folio }]);
    // }


  }

}
