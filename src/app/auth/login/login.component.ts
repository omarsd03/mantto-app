import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { AlertasService } from '../../services/alertas.service';

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

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router, private alertasService: AlertasService ) { }

  iniciarSesion() {

    this.formSubmitted = true;
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      return;
    }

    this.clicked = true;
    
    Swal.fire({
      title: 'Autenticando..',
      html: 'Espere un momento',
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    });

    this.usuarioService.iniciarSesion(this.loginForm.value).subscribe(resp => {

      // console.log('usuario logueado');
      console.log(resp);
      if (resp.ok) {
        this.router.navigateByUrl('/');
      } else {
        this.alertasService.errorAlerta();
      }
      
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
