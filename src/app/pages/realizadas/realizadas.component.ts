import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-realizadas',
  templateUrl: './realizadas.component.html',
  styleUrls: ['./realizadas.component.css']
})
export class RealizadasComponent implements OnInit {

  public realizadas: any = [];

  constructor(private actividadesService: ActividadesService) { }

  ngOnInit(): void {
    this.obtenerRealizadas();
  }

  obtenerRealizadas() {

    this.actividadesService.obtenerRealizadas().subscribe( (resp: any) => {
      console.log(resp);
      this.realizadas = resp.registros;
    })

  }

}
