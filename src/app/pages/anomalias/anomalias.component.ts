import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-anomalias',
  templateUrl: './anomalias.component.html',
  styleUrls: ['./anomalias.component.css']
})
export class AnomaliasComponent implements OnInit {

  public anomalias: any = [];

  constructor(private actividadesService: ActividadesService) { }

  ngOnInit(): void {
    this.obtenerAnomalias();
  }

  obtenerAnomalias() {

    this.actividadesService.obtenerAnomalias().subscribe( (resp: any) => {
      console.log(resp);
      this.anomalias = resp.registros;
    })

  }

}
