import { Component, OnInit } from '@angular/core';
import { ModalDetalleNokService } from '../../services/modal-detalle-nok.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-modal-detalle-nok',
  templateUrl: './modal-detalle-nok.component.html',
  styleUrls: ['./modal-detalle-nok.component.css']
})
export class ModalDetalleNokComponent implements OnInit {

  public myform: FormGroup;
  firstName: FormControl;

  constructor(public modalDetalleNokService: ModalDetalleNokService) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  cerrarModal() {
    this.modalDetalleNokService.cerrarModal();
  }

  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    // this.lastName = new FormControl('', Validators.required);
    // this.email = new FormControl('', [
    //   Validators.required,
    //   Validators.pattern("[^ @]*@[^ @]*")
    // ]);
    // this.password = new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(8)
    // ]);
    // this.language = new FormControl('');
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        // lastName: this.lastName,
      }),
      // email: this.email,
      // password: this.password,
      // language: this.language
    });
  }

  actualizarAnomalia() {
    console.log(':D');
    console.log(this.myform.value);
  }

}
