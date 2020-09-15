import { Injectable } from '@angular/core';
import { BuilderService } from './builder.service';

@Injectable({
  providedIn: 'root'
})
export class ModalDetalleOkService {

  private _ocultarModal: boolean = true;
  public registros: any = [];

  constructor(private builderService: BuilderService) { }

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal( folio: string, id_sub_maquina: any ) {

    this.builderService.dataDetalleOk(folio, id_sub_maquina).subscribe( (resp: any) => {

      console.log(resp);

      if (resp.ok) {
        this._ocultarModal = false;
        this.registros = resp.registros;
      }
      

    });

  }

  cerrarModal() {
    this._ocultarModal = true;
  }

}
