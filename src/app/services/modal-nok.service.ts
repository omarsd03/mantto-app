import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActividadesService } from './actividades.service';

@Injectable({
  providedIn: 'root'
})
export class ModalNokService {

  private base_url = environment.base_url;

  private _ocultarModal: boolean = true;
  private folio: string;
  private id_maquina: number;
  private id_sub_maquina: any
  
  constructor(private http: HttpClient, private actividadesService: ActividadesService) { }

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

  // abrirModal(folio: string, id_maquina: number, id_sub_maquina: number) {
  //   this.folio = folio;
  //   this.id_maquina = id_maquina;
  //   this.id_sub_maquina = id_sub_maquina;
  //   this._ocultarModal = false;
  // }

  abrirModal( tipo: 'OK'|'NOK', id: string, folio: string ) {

    // if (tipo === 'NOK') {
    //   this.anomalia = false;
    // } else {
    //   this.anomalia = true;
    // }

    this._ocultarModal = false;
    // this.tipo = tipo;
    this.id_sub_maquina = id;
    this.folio = folio;

  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  postearAnomalia(forma: any, img: File) {

    if (this.loggedIn()) {
      
      const sgi = localStorage.getItem('sgi');
      const role = localStorage.getItem('role');
      // const jsonData = { id_actividad: id, folio, opcion: tipo, descripcion, rol: role, sgi};
      
      // if (this.cargarImagen(img, tipo, folio, sgi)) {
      if (this.actividadesService.cargarImagen(img, 'NOK', this.folio, sgi, this.id_sub_maquina)) {
        // return this.http.post(`${this.base_url}/realizar`, jsonData, this.headers);
        return this.http.post(`${this.base_url}/postearAnomalia`, { sgi: sgi, role: role, folio: this.folio, id_sub_maquina: this.id_sub_maquina, datos: forma }, this.headers);
      } else {
        console.log('Error en la peticion');
      }

    }


  }

  // actualizarAnomalia(forma) {

  //   const sgi = localStorage.getItem('sgi');
  //   const role = localStorage.getItem('role');
    
  //   const jsonAnomalia = { sgi, role, folio: this.folio, id_maquina: this.id_maquina, id_sub_maquina: this.id_sub_maquina };

  //   console.log({ general: jsonAnomalia, datos: forma });

  //   return this.http.post(`${this.base_url}/coordinarAnomalia`, { general: jsonAnomalia, datos: forma }, this.headers)

  // }
  
}
