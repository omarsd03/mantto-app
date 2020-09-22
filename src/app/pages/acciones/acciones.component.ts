import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { AlertasService } from '../../services/alertas.service';

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.css']
})
export class AccionesComponent implements OnInit {

  public acciones: any = [];
  public vacio = 1;

  constructor(private actividadesService: ActividadesService, private alertasService: AlertasService) { }

  ngOnInit(): void {
    this.verAcciones();
  }

  verAcciones() {

    this.alertasService.mostrarAlerta();

    this.actividadesService.verAcciones().subscribe( (resp: any) => {

      console.log(resp);
      
      if (resp.ok) {

        this.alertasService.cerrarAlerta();
        this.acciones = resp.registros;

        if (this.acciones.length > 0) {
          this.vacio = 1;
        } else {
          this.vacio = 0;
        }

      } else {
        this.alertasService.errorAlerta();
      }

    });

  }

}
