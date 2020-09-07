import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ModalDetalleNokService {

  private base_url = environment.base_url;

  private _ocultarModal: boolean = true;
  private folio: string;
  private id_maquina: number;
  private id_sub_maquina: number
  
  constructor(private http: HttpClient) { }

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

  abrirModal(folio: string, id_maquina: number, id_sub_maquina: number) {
    this.folio = folio;
    this.id_maquina = id_maquina;
    this.id_sub_maquina = id_sub_maquina;
    this._ocultarModal = false;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  actualizarAnomalia(forma) {

    const sgi = localStorage.getItem('sgi');
    const role = localStorage.getItem('role');
    
    const jsonAnomalia = { sgi, role, folio: this.folio, id_maquina: this.id_maquina, id_sub_maquina: this.id_sub_maquina };

    console.log({ general: jsonAnomalia, datos: forma });

    return this.http.post(`${this.base_url}/coordinarAnomalia`, { general: jsonAnomalia, datos: forma }, this.headers)

  }

}
