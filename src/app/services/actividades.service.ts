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

  obtenerPendientes() {

    const sgi = localStorage.getItem('sgi');
    const role = localStorage.getItem('role');
    const jsonData = { sgi, role };

    return this.http.post(`${this.base_url}/pendientes`, jsonData, this.headers);

  }
}
