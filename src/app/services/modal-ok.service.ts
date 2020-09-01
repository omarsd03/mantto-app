import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalOkService {

  private _ocultarModal: boolean = true;
  public tipo: string;
  public id: string;
  public folio: string;
  public anomalia: boolean = true;

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal( tipo: 'OK'|'NOK', id: string, folio: string ) {

    if (tipo === 'NOK') {
      this.anomalia = false;
    } else {
      this.anomalia = true;
    }

    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.folio = folio;

  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
