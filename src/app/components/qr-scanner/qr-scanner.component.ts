import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ModalOkService } from '../../services/modal-ok.service';
import { ActividadesService } from '../../services/actividades.service';
import { ModalAccionesService } from '../../services/modal-acciones.service';
import { ModalNokService } from '../../services/modal-nok.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent {

  public scannerEnabled: boolean = true;
  public id: string = this.activatedRoute.snapshot.paramMap.get('id');
  public folio: string = this.activatedRoute.snapshot.paramMap.get('folio');

  public role: string = localStorage.getItem('role');

  public actividad = [];
  public images = [];
  public categorias = [];

  public base_url = environment.base_url;

  constructor(private modalOkService: ModalOkService, 
              private modalNokService: ModalNokService,
              private activatedRoute: ActivatedRoute, 
              private router: Router,
              private actividadesService: ActividadesService,
              private modalAccionesService: ModalAccionesService) { }

  scanSuccessHandler($event: any) {

    try {
      
      this.scannerEnabled = false;
      let jsonScanner = JSON.parse($event);
      console.log($event);
      console.log(jsonScanner);
  
      if (jsonScanner._id == parseInt(this.id)) {
        
        this.obtenerActividad();
        // this.scannerEnabled = false;

      } else {

        this.scannerEnabled = true;
        
        Swal.fire({
          title: 'Maquina erronea',
          text: "Este QR no corresponde a la actividad que realizaras..",
          icon: 'warning'
        })

      }

    } catch (error) {
      console.log(error);
      this.scannerEnabled = true;
      Swal.fire({
        title: 'QR No Valido!',
        html: 'Por favor intenta escanear nuevamente',
        timer: 2000,
        timerProgressBar: true,
        icon: 'warning'
      })
    }

  }

  obtenerActividad() {

    this.actividadesService.obtenerActividad(this.id, this.folio).subscribe( (resp: any) => {

      console.log(resp);
      this.actividad = resp.registros;

      if (this.role == 'Responsable') {
        this.categorias = resp.categorias;
        this.images = resp.images;
      }

    });

  }

  enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
  }

  abrirModalOK() {
    this.modalOkService.abrirModal('OK', this.id, this.folio);
  }
  
  abrirModalNOK() {
    this.modalNokService.abrirModal('NOK', this.id, this.folio);
  }

  abrirModalAcciones() {
    this.modalAccionesService.abrirModal(this.id, this.folio)
  }

  regresar() {

    if (this.role == 'Operador') {
      this.router.navigateByUrl(`/actividades/${this.folio}`);
    } else {
      this.router.navigateByUrl('/');
    }


  }

}
