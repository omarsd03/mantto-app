import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActividadesService } from '../../services/actividades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  private folio: string;

  public actividades: any = [];

  constructor(private route: ActivatedRoute, private router: Router, private actividadesService: ActividadesService) { }

  ngOnInit(): void {
    this.obtenerFolio();
  }

  obtenerFolio() {
    this.folio = this.route.snapshot.paramMap.get('folio');
    this.obtenerActividades(this.folio);
  }

  obtenerActividades(folio: string) {

    this.actividadesService.obtenerActividades(folio).subscribe( (resp: any) => {

      console.log(resp);
      
      if (resp.ok == true) {

        if (resp.registros.length > 0) {
          this.actividades = resp.registros;
        } else {
          Swal.fire('Completado', 'Terminaste tus actividades en esta tarjeta', "success");
          this.router.navigateByUrl('/');
        }

      } else {
        Swal.fire('Error', resp.error, 'error');
      }

    })

  }

}
