import { Component, OnInit } from '@angular/core';

import { ModalOkService } from '../../services/modal-ok.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent implements OnInit {

  public scannerEnabled: boolean = true;
  public information: string = 'No se ha detectado información de ningún código. Acerque un código QR para escanear.';

  constructor(private modalOkService: ModalOkService) { }

  ngOnInit(): void {
  }

  public scanSuccessHandler($event: any) {
    
    this.scannerEnabled = false;
    this.information = "Espera recuperando información... ";

    console.log($event);

  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "No se ha detectado información de ningún código. Acerque un código QR para escanear.";
  }

  abrirModal() {
    console.log(':D');
    this.modalOkService.abrirModal();
  }

}
