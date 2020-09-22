import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalOkService } from '../../services/modal-ok.service';
import { ActividadesService } from '../../services/actividades.service';
import Swal from 'sweetalert2';
import { AlertasService } from '../../services/alertas.service';


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
              private router: Router,
              private alertasService: AlertasService) { }

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

    // this.alertasService.mostrarAlerta();

    this.actividadesService.realizarActividad(id, folio, tipo, descripcion, this.imagenSubir).then((response: any) => {

      response.subscribe( (resp: any) => {

        console.log(resp);

        if (resp.ok) {

          // this.alertasService.cerrarAlerta();
          this.cerrarModal();

          // Swal.fire('Buen trabajo!', resp.message, 'success');
          Swal.fire({
            title: 'Buen trabajo!',
            text: resp.message,
            icon: 'success',
          }).then( (result) => {
            
            if (result.isDismissed || result.isConfirmed) {
              
              let role = localStorage.getItem('role');
      
              if (role == 'Operador') {
                this.router.navigateByUrl(`/actividades/${folio}`);
              } else if (role == 'Responsable') {
                this.router.navigateByUrl('/');
              }

            }

          });

          // return;

    
        } else {
          this.alertasService.errorAlerta();
        }

      });

    }).catch(err => {
      console.log(err);
    });

  }

}
