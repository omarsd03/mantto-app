import { Injectable } from '@angular/core';
import { BuilderService } from './builder.service';

@Injectable({
  providedIn: 'root'
})
export class ModalDetalleNokService {

  private _ocultarModal: boolean = true;
  public registros: any = [];
  
  constructor(private builderService: BuilderService) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    }
  }

  get ocultarModal() {
    return this._ocultarModal;
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  abrirModal( folio: string, id_sub_maquina: any ) {

    // this._ocultarModal = false;

    this.builderService.dataDetalleNok(folio, id_sub_maquina).subscribe( (resp: any) => {

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
