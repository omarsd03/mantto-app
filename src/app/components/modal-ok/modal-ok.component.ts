import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalOkService } from '../../services/modal-ok.service';
import { ActividadesService } from '../../services/actividades.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-ok',
  templateUrl: './modal-ok.component.html',
  styleUrls: ['./modal-ok.component.css']
})
export class ModalOkComponent implements OnInit {

  public formSubmitted = false;

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(public modalOkService: ModalOkService, 
              private actividadesService: ActividadesService,
              private router: Router) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalOkService.cerrarModal();
  }

  subirImagen(file: File) {

    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  realizarActividad(descripcion: string = '') {

    const folio = this.modalOkService.folio;
    const id = this.modalOkService.id;
    const tipo = this.modalOkService.tipo;

    this.actividadesService.realizarActividad(id, folio, tipo, descripcion, this.imagenSubir).subscribe( (resp: any) => {
      
      console.log(resp);

      if (resp.ok == true) {

        this.cerrarModal();
        Swal.fire('Buen trabajo!', resp.message, 'success');
        this.router.navigateByUrl(`/actividades/${folio}`);

      }

    });

  }

}
