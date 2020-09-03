import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
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

  obtenerCheckbox(categoria) {

    if (this.loggedIn()) {

      const sgi = localStorage.getItem('sgi');
      const role = localStorage.getItem('role');
      const jsonData = { sgi, role, categoria };

      return this.http.post(`${this.base_url}/checkbox`, jsonData, this.headers);
      
    }

  }

  obtenerResponsables() {

    const sgi = localStorage.getItem('sgi');
    const role = localStorage.getItem('role');
    const jsonData = { sgi, role };

    return this.http.post(`${this.base_url}/responsables`, jsonData, this.headers);

  }

}
