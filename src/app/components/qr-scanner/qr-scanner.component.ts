import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ModalOkService } from '../../services/modal-ok.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent {

  public scannerEnabled: boolean = true;
  public id: string;
  public folio: string;

  constructor(private modalOkService: ModalOkService, private router: Router) { }

  scanSuccessHandler($event: any) {

    this.scannerEnabled = false;
    console.log($event);

    // this.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
    //   const navigation = this.router.getCurrentNavigation();
    //   console.log(navigation);
    // });

  }

  enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
  }

  abrirModal() {
    console.log(':D');
    // this.modalOkService.abrirModal();
  }

}
