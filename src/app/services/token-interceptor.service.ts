import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private usuariosService: UsuarioService) { }

  intercept(req, next) {
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.usuariosService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }

}
