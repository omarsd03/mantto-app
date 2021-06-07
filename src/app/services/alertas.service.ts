import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  mostrarAlerta() {

    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      // timer: 3000,
      // timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    Toast.fire({
      icon: 'info',
      title: 'Cargando..'
    });

  }

  cerrarAlerta() {
    Swal.close();
  }

  errorAlerta() {
    Swal.fire('Error', 'Ha ocurrido un error en el servidor', 'error');
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

  sesionCaducada() {

    Swal.fire('Sesion Caducada', 'Vuelve a iniciar sesion', 'info');
    this.logout();

  }
}
