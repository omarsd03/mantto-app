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
  
      return this.http.post(`${this.base_url}/pendientes`, jsonData, this.headers);
      
    }

  }

  obtenerActividades(folio: string) {

    if (this.loggedIn()) {
      
      const jsonData = {folio};
      
      return this.http.post(`${this.base_url}/actividades`, jsonData, this.headers);
      
    }

  }

  obtenerActividad(id: string, folio: string) {

    if (this.loggedIn()) {
      
      const sgi = localStorage.getItem('sgi');
      const role = localStorage.getItem('role');
      const jsonData = { id_actividad: id, sgi, folio, role };

      return this.http.post(`${this.base_url}/actividad`, jsonData, this.headers);

    }

  }

  realizarActividad(id: string, folio: string, tipo: string, descripcion: string, img: File) {

    if (this.loggedIn()) {
      
      const sgi = localStorage.getItem('sgi');
      const role = localStorage.getItem('role');
      const jsonData = { id_actividad: id, folio, opcion: tipo, descripcion, rol: role};

      if (this.cargarImagen(img, tipo, folio, sgi)) {
        return this.http.post(`${this.base_url}/realizar`, jsonData, this.headers);
      } else {
        console.log('Error en la peticion');
      }

    }

  }

  async cargarImagen(img: File, tipo: string, folio: string, sgi: string) {

    if (this.loggedIn()) {

      try {
        
        const formData = new FormData();
        formData.append('archivo', img);
        formData.append('tipo', tipo);
        formData.append('folio', folio);
        formData.append('sgi', sgi);

        const resp = await fetch(`${this.base_url}/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`
          },
          body: formData
        });

        const data = await resp.json();

        if (data.ok) {
          console.log(data);
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
      const jsonData = { sgi: sgi, status: 'OK' };

      return this.http.post(`${this.base_url}/realizadas`, jsonData, this.headers);

    }

  }

  obtenerAnomalias() {

    if (this.loggedIn()) {
      
      const sgi = localStorage.getItem('sgi');
      const jsonData = { sgi: sgi, status: 'NOK' };

      return this.http.post(`${this.base_url}/anomalias`, jsonData, this.headers);

    }

  }

}
