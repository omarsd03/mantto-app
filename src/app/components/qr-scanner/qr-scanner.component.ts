import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ModalOkService } from '../../services/modal-ok.service';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent {

  public scannerEnabled: boolean = true;
  public id: string = this.activatedRoute.snapshot.paramMap.get('id');
  public folio: string = this.activatedRoute.snapshot.paramMap.get('folio');

  public actividad = [];

  constructor(private modalOkService: ModalOkService, 
              private activatedRoute: ActivatedRoute, 
              private router: Router,
              private actividadesService: ActividadesService) { }

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
      })
    }

  }

  obtenerActividad() {

    this.actividadesService.obtenerActividad(this.id, this.folio).subscribe( (resp: any) => {
      console.log(resp);
      this.actividad = resp.registros;
    });

  }

  enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
  }

  abrirModalOK() {
    this.modalOkService.abrirModal('OK', this.id, this.folio);
  }
  
  abrirModalNOK() {
    this.modalOkService.abrirModal('NOK', this.id, this.folio);
  }

  regresar() {
    this.router.navigateByUrl(`/actividades/${this.folio}`);
  }

}
