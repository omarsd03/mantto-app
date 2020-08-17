import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalOkComponent } from './modal-ok/modal-ok.component';
import { ModalNokComponent } from './modal-nok/modal-nok.component';
import { ModalDetalleOkComponent } from './modal-detalle-ok/modal-detalle-ok.component';
import { ModalDetalleNokComponent } from './modal-detalle-nok/modal-detalle-nok.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [ModalOkComponent, ModalNokComponent, ModalDetalleOkComponent, ModalDetalleNokComponent, QrScannerComponent],
  exports: [ModalOkComponent, ModalNokComponent, ModalDetalleOkComponent, ModalDetalleNokComponent, QrScannerComponent],
  imports: [
    CommonModule,
    ZXingScannerModule
  ]
})
export class ComponentsModule { }
