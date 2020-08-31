import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ModalOkService } from '../../services/modal-ok.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent {

  public scannerEnabled: boolean = true;
  public id: string = this.activatedRoute.snapshot.paramMap.get('id');
  public folio: string = this.activatedRoute.snapshot.paramMap.get('folio');

  constructor(private modalOkService: ModalOkService, private activatedRoute: ActivatedRoute, private router: Router) { }

  scanSuccessHandler($event: any) {

    try {
      
      let jsonScanner = JSON.parse($event);
      console.log($event);
      console.log(jsonScanner);
  
      if (jsonScanner._id == parseInt(this.id)) {

        console.log('Peticion HTTP');
        this.scannerEnabled = false;

      } else {
        
        Swal.fire({
          title: 'Maquina erronea',
          text: "Este QR no corresponde a la actividad que realizaras..",
          icon: 'warning'
        })

      }

    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'QR No Valido!',
        html: 'Por favor intenta escanear nuevamente',
        timer: 2000,
        timerProgressBar: true,
      })
    }

  }

  enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
  }

  abrirModal() {
    console.log(':D');
    this.modalOkService.abrirModal('ok', 1, 'MNT-00000001');
  }

  regresar() {
    this.router.navigateByUrl(`/actividades/${this.folio}`);
  }

}
