import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    sgi: ['', [Validators.required, Validators.minLength(8)] ],
    password: ['', [Validators.required] ]
  });

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router ) { }

  iniciarSesion() {

    this.formSubmitted = true;
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      return;
    }

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    Toast.fire({
      icon: 'success',
      title: 'Autenticado correctamente'
    });

    this.router.navigateByUrl('/');
    return;

    this.usuarioService.iniciarSesion(this.loginForm.value).subscribe(resp => {

      console.log('usuario logueado');
      console.log(resp);
      this.router.navigateByUrl('/');
      
    }, (err) => {
      Swal.fire('Error', err.message, 'error');
    });

  }

  campoNoValido(campo: string): boolean {

    if (this.loginForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

}
