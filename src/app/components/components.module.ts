import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalOkComponent } from './modal-ok/modal-ok.component';
import { ModalNokComponent } from './modal-nok/modal-nok.component';
import { ModalDetalleOkComponent } from './modal-detalle-ok/modal-detalle-ok.component';
import { ModalDetalleNokComponent } from './modal-detalle-nok/modal-detalle-nok.component';
import { ModalAccionesComponent } from './modal-acciones/modal-acciones.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [ModalOkComponent, ModalNokComponent, ModalDetalleOkComponent, ModalDetalleNokComponent, QrScannerComponent, GraficoDonaComponent, ModalAccionesComponent],
  exports: [ModalOkComponent, ModalNokComponent, ModalDetalleOkComponent, ModalDetalleNokComponent, QrScannerComponent, GraficoDonaComponent, ModalAccionesComponent],
  imports: [
    CommonModule,
    ZXingScannerModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
