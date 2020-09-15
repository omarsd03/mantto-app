import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent {

  private role = localStorage.getItem('role');
  // private etiquetas: Label[] = [];
  // private lengthDataSet: MultiDataSet = [];
  // private colores: any = [];

  get labels() {

    if (this.role == 'Operador') {
      return ['Label1', 'Label2', 'Label3']
    } else {
      return ['Label1', 'Label2']
    }

  }

  get dataSet() {

    if (this.role == 'Operador') {
      return [[350, 450, 100]]
    } else {
      return [[350, 450]]
    }

  }

  get coloresGrafica() {

    if (this.role == 'Operador') {
      return [ '#FFC409','#2DD36F','#EB445A' ]
    } else {
      return [ '#FFC409','#2DD36F' ]
    }

  }

  @Input() title: string = 'Sin titulo';

  @Input('labels') doughnutChartLabels: Label[] = this.labels
  @Input('data') doughnutChartData: MultiDataSet = this.dataSet;

  public colors: Color[] = [
    { backgroundColor: this.coloresGrafica }
  ];

}
