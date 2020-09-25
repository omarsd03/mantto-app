import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private alertasService: AlertasService) { }

  intercept(req, next) {

    const token: string = localStorage.getItem('token');

    console.log('Token Interceptor');

    const tokenizeReq = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`
      }
    });

    return next.handle(tokenizeReq).pipe(
      catchError( (err: HttpErrorResponse) => {

        console.log(err);
        this.alertasService.cerrarAlerta();
        
        if (err.status === 401) {
          this.alertasService.sesionCaducada();
          this.router.navigateByUrl('/login');
        }

        return throwError(err);

      })
    );

  }

}
