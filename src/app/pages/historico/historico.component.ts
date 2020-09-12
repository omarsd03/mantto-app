import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent {

  public labels1: string[] = ['Pendientes', 'OK', 'NOK'];

  public data1 = [];
  // public data1 = [
  //   [10, 15, 40]
  // ];

  constructor(private actividadesService: ActividadesService) { }

  ngOnInit(): void {
    this.historico();
  }

  historico() {

    this.actividadesService.historico().subscribe( (resp: any) => {
      
      if (resp.ok) {
        this.data1 = [ resp.registros[2].Pendiente, resp.registros[0].OK, resp.registros[1].NOK ]
      }

    });

  }

}
