import { Component, OnInit } from '@angular/core';
import { ModalOkService } from '../../services/modal-ok.service';

@Component({
  selector: 'app-modal-ok',
  templateUrl: './modal-ok.component.html',
  styleUrls: ['./modal-ok.component.css']
})
export class ModalOkComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(public modalOkService: ModalOkService) { }

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

}
