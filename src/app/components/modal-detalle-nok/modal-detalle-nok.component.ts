import { Component, OnInit } from '@angular/core';
import { ModalDetalleNokService } from '../../services/modal-detalle-nok.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { BuilderService } from '../../services/builder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-detalle-nok',
  templateUrl: './modal-detalle-nok.component.html',
  styleUrls: ['./modal-detalle-nok.component.css']
})
export class ModalDetalleNokComponent implements OnInit {

  public forma: FormGroup;
  public clasificacion: string;

  public role = localStorage.getItem('role');

  public checks: Array<any> = [];

  public responsables: Array<any> = [];

  constructor(public modalDetalleNokService: ModalDetalleNokService, 
              private fb: FormBuilder, 
              private builderService: BuilderService, 
              private router: Router) {
    this.crearFormulario();
    this.renderizarResponsables();
  }

  ngOnInit(): void {
  }

  renderizarResponsables() {

    this.builderService.obtenerResponsables().subscribe( (resp: any) => {
      console.log(resp);
      this.responsables = resp.registros;
    });

  }

  valorCategoria() {

    console.log(this.forma.get('categoria').value);
    this.clasificacion = this.forma.get('categoria').value;
    const formArray: FormArray = this.forma.get('anomalias') as FormArray;
    formArray.reset();
    formArray.clear();

    // this.builderService.obtenerCheckbox(this.clasificacion).subscribe( (resp: any) => {
    //   console.log(resp);
    //   this.checks = resp.registros;
    // });

  }

  onCheckChange(event) {

    const formArray: FormArray = this.forma.get('anomalias') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      // formArray.push(new FormControl(event.target.value));
      formArray.push(new FormControl({name: event.target.value}));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {

        if(ctrl.value.name == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;

      });
    }
  }

  get categoriaNoValido() {
    return this.forma.get('categoria').invalid && this.forma.get('categoria').touched;
  }

  get clasificacionNoValido() {
    return this.forma.get('clasificacion').invalid && this.forma.get('clasificacion').touched;
  }

  get responsableNoValido() {
    return this.forma.get('responsable').invalid && this.forma.get('responsable').touched;
  }

  cerrarModal() {
    this.modalDetalleNokService.cerrarModal();
    this.forma.reset();
    this.clasificacion = null;
  }

  crearFormulario() {

    this.forma = this.fb.group({
      categoria: ['', [Validators.required]],
      clasificacion: ['', [Validators.required]],
      anomalias: new FormArray([], Validators.required),
      responsable: ['', [Validators.required]]
    });

  }

  actualizarAnomalia() {

    // TODO: Traer a los responsables para que el interceptor los pueda seleccionar
    console.log(this.forma.value);
    console.log(this.forma.invalid);

    if (this.forma.invalid) {
      Swal.fire({ title: 'Campos obligatorios!', html: 'Por favor llena los campos correctamente', timer: 2000, timerProgressBar: true, icon: 'warning' });
      return;
    }

    this.modalDetalleNokService.actualizarAnomalia(this.forma.value).subscribe( (resp: any) => {
      
      if (resp.ok) {
        
        Swal.fire({ title: 'Genial!', html: resp.message, icon: 'success' });
        this.cerrarModal();
        this.router.navigateByUrl('/');

      }

    });

  }

}
