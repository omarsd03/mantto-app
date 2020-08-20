import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService ) { }

  iniciarSesion() {

    this.formSubmitted = true;
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      console.log('Posteando formulario');
    } else {
      console.log('Formulario no es correcto');
    }

  }

  campoNoValido(campo: string): boolean {

    if (this.loginForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

}
