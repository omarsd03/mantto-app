import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

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

  getKey() {
    return this.http.get(`${this.base_url}/key`, this.headers);
  }

  addPushSubscriber(sub:any) {
    return this.http.post(`${this.base_url}/subscribe`, sub, this.headers);
  }

  send() {
    return this.http.post(`${this.base_url}/newsletter`, null);
  }

}
