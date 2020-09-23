import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  private base_url = environment.base_url;
  private VAPID_PUBLIC = "BHjIoB9F03UAYERcXvgaLcpPN_aru8rs03gtZ_aEPPTwJwwlBzkRaJg14ny_Y0DeKfR3xBDVF9CuGPvlcXEvZAc";

  constructor(private http: HttpClient, private swPush: SwPush) { }

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

  permisosNotificaciones() {

    if (this.swPush.isEnabled) {
      
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC
      }).then(subscription => {

        console.log(subscription);
        this.addPushSubscriber(subscription).subscribe( (resp: any) => {
          console.log(resp);
        })
        
      }).catch(err => {
        console.log(err);
      });

    }

  }

  addPushSubscriber(sub:any) {
    console.log(sub);
    return this.http.post(`${this.base_url}/subscribe`, sub, this.headers);
  }

  send() {
    return this.http.post(`${this.base_url}/newsletter`, null);
  }

}
