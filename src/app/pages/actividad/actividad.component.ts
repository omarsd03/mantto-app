import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

  public id: string = this.activatedRoute.snapshot.paramMap.get('id');
  public folio: string = this.activatedRoute.snapshot.paramMap.get('folio');

  constructor(private activatedRoute: ActivatedRoute) {
    
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.folio = this.activatedRoute.snapshot.paramMap.get('folio');

  }

  ngOnInit(): void {
  }

}
