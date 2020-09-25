import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  
  constructor(private usuarioService: UsuarioService, private router: Router) { }
  
  canActivate(): boolean {
    
    if (!this.usuarioService.loggedIn()) {
      return true;
    }

    this.router.navigateByUrl('/');
    return false;
    
  }
  
}
