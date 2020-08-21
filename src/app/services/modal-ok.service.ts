import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalOkService {

  private _ocultarModal: boolean = true;
  public tipo: string;
  public id: string;
  public folio: string;

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal( tipo: 'ok'|'nok', id: string, folio: string ) {
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
