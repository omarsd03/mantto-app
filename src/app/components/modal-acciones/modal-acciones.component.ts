import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import Swal from "sweetalert2";

import { ModalAccionesService } from '../../services/modal-acciones.service';
import { BuilderService } from '../../services/builder.service';

@Component({
  selector: 'app-modal-acciones',
  templateUrl: './modal-acciones.component.html',
  styleUrls: ['./modal-acciones.component.css']
})
export class ModalAccionesComponent implements OnInit {

  public formGroup: FormGroup;
  
  public acciones: any = [];

  constructor(public modalAccionesService: ModalAccionesService,
              private fb: FormBuilder,
              private builderService: BuilderService) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario() {
    this.formGroup = this.fb.group({
      features: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  get features(): FormArray {
    return this.formGroup.get('features') as FormArray;
  }

  addFeature(): void {
    this.features.push(this.fb.control('', Validators.required));
  }

  getValidity(i) {
    return (<FormArray>this.formGroup.get('features')).controls[i].invalid;
  }

  removeFeature(index): void {
    this.features.removeAt(index);
    console.log(this.features);
  }

  agregarAcciones() {

    if (this.formGroup.invalid || this.features.length == 0) {
      Swal.fire({ title: 'Campos invalidos!', html: 'Los campos deben estar llenos o por lo menos debes agregar una accion', timer: 2000, timerProgressBar: true, icon: 'warning' });
      return;
    }

    this.modalAccionesService.agregarAcciones(this.formGroup.value).subscribe( (resp: any) => {
      
      console.log(resp);

      if (resp.ok) {
        Swal.fire('Excelente!', resp.message, 'success');
        this.modalAccionesService.cerrarModal();
        this.formGroup.reset();
      } else {
        Swal.fire('Ups', 'Ha ocurrido un error en el servidor', 'error');
      }

    })

  }

  // get acciones() {
  //   return this.forma.get('acciones') as FormArray;
  // }

  // crearFormulario() {
  //   this.forma = this.fb.group({
  //     // acciones: this.fb.array([])
  //     acciones: new FormArray([], Validators.required)
  //     // acciones: [this.fb.array([]), Validators.required]
  //   })
  // }

  // agregarAccion() {
  //   this.acciones.push(  this.fb.control('')  );
  // }
  
  // borrarAccion(i: number) {
  //   this.acciones.removeAt(i);
  // }

  cerrarModal() {
    this.modalAccionesService.cerrarModal();
  }

  // agregarAcciones() {

  //   console.log(this.acciones.invalid);
    
  //   console.log(this.forma.invalid);
    

  //   if (this.forma.invalid) {
  //     Swal.fire({ title: 'Campos invalidos!', html: 'Los campos deben estar llenos o por lo menos debes agregar una accion', timer: 2000, timerProgressBar: true, icon: 'warning' });
  //     return;
  //   }

  //   console.log(this.forma.value);

  // }

}
