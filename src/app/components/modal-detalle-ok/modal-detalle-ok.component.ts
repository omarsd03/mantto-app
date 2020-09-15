import { Component, OnInit } from '@angular/core';
import { ModalDetalleOkService } from '../../services/modal-detalle-ok.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-modal-detalle-ok',
  templateUrl: './modal-detalle-ok.component.html',
  styleUrls: ['./modal-detalle-ok.component.css']
})
export class ModalDetalleOkComponent implements OnInit {

  public base_url = environment.base_url;

  constructor(public modalDetalleOkService: ModalDetalleOkService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalDetalleOkService.cerrarModal();
  }

}
