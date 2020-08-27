import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pendientes: any = [];

  constructor(private actividadesService: ActividadesService) { }

  ngOnInit(): void {
    this.obtenerPendientes();
  }
  
  obtenerPendientes() {
    this.actividadesService.obtenerPendientes().subscribe((resp: any) => {
      console.log(resp);
      this.pendientes = resp.registros;
    });
  }

}
