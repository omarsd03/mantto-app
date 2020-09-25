import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  
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

  obtenerPendientes() {

    if (this.loggedIn()) {

      const sgi = localStorage.getItem('sgi');
      const role = localStorage.getItem('role');
      const jsonData = { sgi, role };
  
      return this.http.post(`${this.base_url}/pendientes`, jsonData);
      
    }

  }

  obtenerActividades(folio: string) {

    if (this.loggedIn()) {
      
      const jsonData = {folio};
      
      return this.http.post(`${this.base_url}/actividades`, jsonData);
      
    }

  }

  obtenerActividad(id: string, folio: string) {

    if (this.loggedIn()) {
      
      const sgi = localStorage.getItem('sgi');
      const role = localStorage.getItem('role');
      const jsonData = { id_actividad: id, sgi, folio, role };

      return this.http.post(`${this.base_url}/actividad`, jsonData);

    }

  }

  async realizarActividad(id: string, folio: string, tipo: string, descripcion: string, img: File) {

    if (this.loggedIn()) {
      
      const sgi = localStorage.getItem('sgi');
      const role = localStorage.getItem('role');
      const jsonData = { id_actividad: id, folio, opcion: tipo, descripcion, rol: role, sgi};

      const imagen = await this.cargarImagen(img, tipo, folio, sgi, id);

      if (imagen) {
        return this.http.post(`${this.base_url}/realizar`, jsonData);
      } else {
        console.log('Error en la peticion');
      }

      // if (this.cargarImagen(img, tipo, folio, sgi, id)) {
      //   return this.http.post(`${this.base_url}/realizar`, jsonData, this.headers);
      // } else {
      //   console.log('Error en la peticion');
      // }

    }

  }

  async cargarImagen(img: File, tipo: string, folio: string, sgi: string, id: any) {

    if (this.loggedIn()) {

      try {
        
        const formData = new FormData();
        formData.append('archivo', img);
        formData.append('tipo', tipo);
        formData.append('folio', folio);
        formData.append('sgi', sgi);
        formData.append('id_sub_maquina', id);

        const resp = await fetch(`${this.base_url}/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`
          },
          body: formData
        });

        const data = await resp.json();
        console.log(data);

        if (data.ok) {
          return true;
        } else {
          return false;
        }

      } catch (error) {
        console.log(error);
        return false;
      }

    }

  }

  obtenerRealizadas() {
    
    if (this.loggedIn()) {
      
      const sgi = localStorage.getItem('sgi');
      const role = localStorage.getItem('role');
      const jsonData = { sgi: sgi, status: 'OK', role: role };

      return this.http.post(`${this.base_url}/realizadas`, jsonData);

    }

  }

  obtenerAnomalias() {

    if (this.loggedIn()) {
      
      const sgi = localStorage.getItem('sgi');
      const role = localStorage.getItem('role');
      const jsonData = { sgi: sgi, status: 'NOK', role: role };

      return this.http.post(`${this.base_url}/anomalias`, jsonData);

    }

  }

  historico() {

    if (this.loggedIn()) {
      
      const sgi = localStorage.getItem('sgi');
      const role = localStorage.getItem('role');

      return this.http.post(`${this.base_url}/historico`, { sgi, role });

    }

  }

  verAcciones() {

    if (this.loggedIn()) {
      
      const sgi = localStorage.getItem('sgi');
      const role = localStorage.getItem('role');

      return this.http.post(`${this.base_url}/verAcciones`, { sgi, role });

    }

  }

}
