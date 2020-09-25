import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ModalOkService } from '../../services/modal-ok.service';
import { ActividadesService } from '../../services/actividades.service';
import Swal from 'sweetalert2';
import { AlertasService } from '../../services/alertas.service';
import { NotificacionesService } from '../../services/notificaciones.service';


@Component({
  selector: 'app-modal-ok',
  templateUrl: './modal-ok.component.html',
  styleUrls: ['./modal-ok.component.css']
})
export class ModalOkComponent implements OnInit {

  @ViewChild('img') img: ElementRef

  public formSubmitted = false;

  public imagenSubir: File;
  public imgTemp: any = null;
  public clicked = false;

  constructor(public modalOkService: ModalOkService, 
              private actividadesService: ActividadesService,
              private router: Router,
              private alertasService: AlertasService,
              private notificaciones: NotificacionesService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.imagenSubir = undefined;
    this.img.nativeElement.value = null;
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

    console.log(folio, tipo, id);
    console.log(this.imagenSubir);

    if (this.imagenSubir === undefined) {
      Swal.fire('Te falta un paso', 'Debes cargar la evidencia para proceder', 'warning');
      return;
    }

    this.clicked = true;

    // this.alertasService.mostrarAlerta();

    this.actividadesService.realizarActividad(id, folio, tipo, descripcion, this.imagenSubir).then((response: any) => {

      response.subscribe( (resp: any) => {

        console.log(resp);

        if (resp.ok) {

          // this.alertasService.cerrarAlerta();
          this.clicked = false;
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

                const titulo = `Anomalia Corregida!`;
                const cuerpo = `Se ha cerrado la anomalia en ${resp.data.sub_maquina} con Folio ${resp.data.folio}`;
                const sgi = resp.data.approval;
                const role = resp.data.role;

                this.notificaciones.enviarNotificacion(titulo, cuerpo, sgi, role).subscribe( (resp: any) => {
                  console.log(resp);
                })

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
