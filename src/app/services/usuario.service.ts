import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  iniciarSesion(formData: any) {
    console.log('Iniciando sesion..');
  }

}
