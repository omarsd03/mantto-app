import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    localStorage.getItem('token') || '';
  }

  // validarToken(): Observable<boolean> {

  //   const token = localStorage.getItem('token') || '';

  //   return this.http.get(`${base_url}/login/renew`, {
  //     headers: {
  //       'x-token': token
  //     }
  //   }).pipe(
  //     tap( (resp: any) => {
  //       localStorage.setItem('token', resp.token);
  //     }),
  //     map(resp => true),
  //     catchError(error => of(false))
  //   );

  // }

  validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/signin/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('id_user', resp.user.id_user);
        localStorage.setItem('sgi', resp.user.user_sgi);
        localStorage.setItem('role', resp.user.user_role);
      }),
      map(resp => true),
      catchError(error => of(false))
    );

  }

  iniciarSesion(formData: LoginForm) {

    // Descomentar para pruebas reales
    return this.http.post(`${base_url}/signin`, formData).pipe(tap(
      (resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('id_user', resp.user.id_user);
        localStorage.setItem('sgi', resp.user.user_sgi);
        localStorage.setItem('role', resp.user.user_role);
      }
    ));

  }

}
