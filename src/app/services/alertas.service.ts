import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() { }

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
}
