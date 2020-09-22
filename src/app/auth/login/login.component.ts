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
  public clicked = false;

  public loginForm = this.fb.group({
    sgi: ['', [Validators.required, Validators.minLength(8)] ],
    password: ['', [Validators.required] ]
  });

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router ) { }

  iniciarSesion() {

    this.formSubmitted = true;
    console.log(this.loginForm.value);

    // return;

    if (this.loginForm.invalid) {
      return;
    }

    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    this.clicked = true;
    
    Swal.fire({
      title: 'Autenticando..',
      html: 'Espere un momento',
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    });
    
    // return;

    this.usuarioService.iniciarSesion(this.loginForm.value).subscribe(resp => {

      // console.log('usuario logueado');
      console.log(resp);
      Toast.fire({
        icon: 'success',
        title: 'Autenticado correctamente'
      });
      this.router.navigateByUrl('/');
      
    }, (err) => {
      console.log(err);
      Swal.fire('Error', err.error.message, 'error');
      this.loginForm.reset();
      this.clicked = false;
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
