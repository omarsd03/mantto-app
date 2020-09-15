import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent {

  public role = localStorage.getItem('role');

  // public labels1: string[] = ['Pendientes', 'OK', 'NOK'];
  public labels1: string[] = [];

  public data1 = [];

  public titulo: string = '';
  // public data1 = [
  //   [10, 15, 40]
  // ];

  validarHistorico() {

    if (this.role == 'Operador') {
      this.labels1 = ['Pendientes', 'OK', 'NOK'];
      this.titulo = 'Historico de Actividades';
      this.historico();
      // this.data1 = [10, 15, 40]
    } else {
      this.labels1 = ['Pendientes', 'OK'];
      this.titulo = 'Historico de Anomalias';
      this.historico();
      // this.data1 = [10, 15]
    }

  }

  constructor(private actividadesService: ActividadesService) { }

  ngOnInit(): void {
    this.validarHistorico()
  }

  historico() {

    this.actividadesService.historico().subscribe( (resp: any) => {

      console.log(resp);
      
      if (resp.ok) {

        if (this.role == 'Operador') {
          this.data1 = [ resp.registros[2].Pendiente, resp.registros[0].OK, resp.registros[1].NOK ]
        } else {
          this.data1 = [ resp.registros[1].Pendiente, resp.registros[0].OK ]
        }


      }

    });

  }

}
