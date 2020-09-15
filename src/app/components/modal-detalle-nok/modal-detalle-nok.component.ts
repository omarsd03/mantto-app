import { Component, OnInit } from '@angular/core';
import { ModalDetalleNokService } from '../../services/modal-detalle-nok.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-detalle-nok',
  templateUrl: './modal-detalle-nok.component.html',
  styleUrls: ['./modal-detalle-nok.component.css']
})
export class ModalDetalleNokComponent implements OnInit {

  public base_url = environment.base_url;

  constructor(public modalDetalleNokService: ModalDetalleNokService) {
  }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalDetalleNokService.cerrarModal();
  }

}
