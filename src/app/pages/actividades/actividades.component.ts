import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  actividades: any = [
    {
      id_actividad: 1,
      nombre: 'Lavadora B6',
      folio: 'MNT-000001'
    },
    {
      id_actividad: 2,
      nombre: 'Lavadora B7',
      folio: 'MNT-000001'
    },
    {
      id_actividad: 3,
      nombre: 'Lavadora B8',
      folio: 'MNT-000001'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
