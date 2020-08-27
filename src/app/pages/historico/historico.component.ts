import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent {

  public labels1: string[] = ['Pendientes', 'OK', 'NOK'];
  public data1 = [
    [10, 15, 40]
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
