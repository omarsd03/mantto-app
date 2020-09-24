import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuilderService {

  private base_url = environment.base_url;

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

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  obtenerCheckbox() {

    if (this.loggedIn()) {

      const sgi = localStorage.getItem('sgi');
      const role = localStorage.getItem('role');
      const jsonData = { sgi, role };

      return this.http.post(`${this.base_url}/checkbox`, jsonData, this.headers);
      
    }

  }

  obtenerResponsables() {

    const sgi = localStorage.getItem('sgi');
    const role = localStorage.getItem('role');
    const jsonData = { sgi, role };

    return this.http.post(`${this.base_url}/responsables`, jsonData, this.headers);

  }

  obtenerAcciones(id: any, folio: any) {

    const sgi = localStorage.getItem('sgi');
    const role = localStorage.getItem('role');
    const jsonData = { sgi, role, id_sub_maquina: id, folio };

    return this.http.post(`${this.base_url}/acciones`, jsonData, this.headers);

  }

  dataDetalleOk(folio, id_sub_maquina) {

    const sgi = localStorage.getItem('sgi');
    const role = localStorage.getItem('role');

    const jsonData = { sgi, role, folio, id_sub_maquina };

    return this.http.post(`${this.base_url}/detalleOk`, jsonData, this.headers);

  }

  dataDetalleNok(folio, id_sub_maquina) {

    const sgi = localStorage.getItem('sgi');
    const role = localStorage.getItem('role');

    const jsonData = { sgi, role, folio, id_sub_maquina };

    return this.http.post(`${this.base_url}/detalleNOk`, jsonData, this.headers)

  }

}
