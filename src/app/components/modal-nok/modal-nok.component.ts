import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { BuilderService } from 'src/app/services/builder.service';
import Swal from 'sweetalert2';
import { ModalNokService } from '../../services/modal-nok.service';
import { AlertasService } from '../../services/alertas.service';

@Component({
  selector: 'app-modal-nok',
  templateUrl: './modal-nok.component.html',
  styleUrls: ['./modal-nok.component.css']
})
export class ModalNokComponent implements OnInit {

  public forma: FormGroup;
  public clasificacion: string;

  // public role = localStorage.getItem('role');
  // public sgi = localStorage.getItem('sgi');

  public imagenSubir: File;
  public imgTemp: any = null;

  public checks: Array<any> = [];

  public responsables: Array<any> = [];

  public otroAnomalia = false;

  public categorias: any = ['Seguridad', 'Mantenimiento', 'Produccion', 'Medio Ambiente'];

  // public selectedCategorias: [string];

  constructor(public modalNokService: ModalNokService, 
              private fb: FormBuilder, 
              private builderService: BuilderService, 
              private router: Router,
              private alertasService: AlertasService) {
    this.crearFormulario();
    this.renderizarAnomalias();
  }

  ngOnInit(): void {
  }

  subirImagen(file: File) {

    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  renderizarAnomalias() {

    this.builderService.obtenerCheckbox().subscribe( (resp: any) => {
      console.log(resp);
      this.checks = resp.registros;
    });

  }

  onCheckChange(event) {

    if (event == 'Otro') {

      this.otroAnomalia = true;

    } else {

      this.otroAnomalia = false;
      
      Swal.fire({
        title: 'Antes de todo, necesitas saber..',
        text: "Este sera el texto de ayuda para las anomalias",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar anomalia',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Perfecto!',
            'Por favor continua con el resto del formulario',
            'success'
          )
        }
        if (result.isDismissed) {
          this.forma.get('anomalia').reset();
          Swal.fire(
            'Ok, no hay problema',
            'Verifica primero la anomalia y vuelve a seleccionar',
            'info'
          )
        }
      });

    }


  }

  get categoriaNoValido() {
    return this.forma.get('categoria').invalid && this.forma.get('categoria').touched;
  }

  get clasificacionNoValido() {
    return this.forma.get('clasificacion').invalid && this.forma.get('clasificacion').touched;
  }
  
  get descripcionNoValido() {
    return this.forma.get('descripcion').invalid && this.forma.get('descripcion').touched;
  }

  cerrarModal() {
    this.modalNokService.cerrarModal();
    this.forma.reset();
    this.clasificacion = null;
    this.imgTemp = null;
  }

  crearFormulario() {

    this.forma = this.fb.group({
      anomalia: ['', [Validators.required]],
      anomaliaEspecifica: ['', [Validators.minLength(3), Validators.maxLength(10)]],
      clasificacion: ['', [Validators.required]],
      // categoria: new FormArray([], Validators.required),
      // categoria: this.fb.array([this.fb.control('', Validators.required)]),
      categorias: this.crearCategorias(),
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      imagen: ['', [Validators.required]]
    });

  }

  crearCategorias() {

    const values = this.categorias.map(categoria => {
      return new FormControl(false);
    });

    return this.fb.array(values)

    // return new FormArray(arr);

  }

  postearAnomalia() {

    if (this.forma.value.anomalia == 'Otro' && this.forma.value.anomaliaEspecifica.length < 3) {
      Swal.fire({ title: 'Anomalia sin especificar!', html: 'Por favor llena los campos correctamente', timer: 2000, timerProgressBar: true, icon: 'warning' });
      return;
    }

    console.log(this.forma.invalid);

    if (this.forma.invalid) {
      Swal.fire({ title: 'Campos obligatorios!', html: 'Por favor llena los campos correctamente', timer: 2000, timerProgressBar: true, icon: 'warning' });
      return;
    }

    let valueSubmit = Object.assign({}, this.forma.value);

    valueSubmit = Object.assign(valueSubmit, {
      categorias: valueSubmit.categorias.map( (v, i) => v ? this.categorias[i] : null ).filter( v => v !== null )
    });

    // console.log(valueSubmit);

    // this.forma.reset();

    // this.alertasService.mostrarAlerta();

    this.modalNokService.postearAnomalia(valueSubmit, this.imagenSubir).subscribe( (resp: any) => {
      
      if (resp.ok) {

        // this.alertasService.cerrarAlerta();
        this.cerrarModal();
        // Swal.fire({ title: 'Buen trabajo!', html: resp.message, icon: 'success' });

        Swal.fire({
          title: 'Buen trabajo!',
          text: resp.message,
          icon: 'success',
        }).then( (result) => {
          
          if (result.isDismissed || result.isConfirmed) {
            
            this.router.navigateByUrl(`/actividades/${resp.folio}`);

          }

        });

        // this.router.navigateByUrl(`/actividades/${resp.folio}`);

      } else {
        localStorage.removeItem('token');
        Swal.fire({ title: 'Oops!', html: 'Parece que hubo un problema, por favor vuelve a iniciar sesion', icon: 'error' });
        this.router.navigateByUrl('/login');
      }

    })

  }

}
