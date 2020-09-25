import { Injectable } from '@angular/core';
import { BuilderService } from './builder.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalAccionesService {

  private base_url = environment.base_url;

  private _ocultarModal: boolean = true;
  public id: string;
  public folio: string;

  public acciones = []

  constructor(private builderService: BuilderService, private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    }
  }

  get ocultarModal() {
    return this._ocultarModal;
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  abrirModal(id: string, folio: string) {

    this.id = id;
    this.folio = folio;

    const sgi = localStorage.getItem('sgi');
    const role = localStorage.getItem('role');
    const jsonData = { sgi, role, id_sub_maquina: id, folio };
    
    this.builderService.obtenerAcciones(id, folio).subscribe( (resp: any) => {
      
      console.log(resp);
      this._ocultarModal = false;
      this.acciones = resp.registros;

    });

  }

  cerrarModal() {
    this._ocultarModal = true
  }

  agregarAcciones(forma) {

    const sgi = localStorage.getItem('sgi');
    const role = localStorage.getItem('role');

    const jsonData = { sgi, role, id_sub_maquina: this.id, folio: this.folio };

    console.log({general: jsonData, acciones: forma});

    return this.http.post(`${this.base_url}/agregarAcciones`, {general: jsonData, acciones: forma})

  }

}
