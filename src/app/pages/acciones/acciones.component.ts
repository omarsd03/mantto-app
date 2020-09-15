import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.css']
})
export class AccionesComponent implements OnInit {

  public acciones: any = [];

  constructor(private actividadesService: ActividadesService) { }

  ngOnInit(): void {
    this.verAcciones();
  }

  verAcciones() {

    this.actividadesService.verAcciones().subscribe( (resp: any) => {

      console.log(resp);
      
      if (resp.ok) {
        this.acciones = resp.registros;
      } else {
        
      }

    });

  }

}
