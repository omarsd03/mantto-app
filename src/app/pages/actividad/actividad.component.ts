import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

  id: string;
  folio: string;
  url: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.url = this.router.parseUrl(this.router.url);
  }

  ngOnInit(): void {
    // this.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
    //   const navigation = this.router.getCurrentNavigation();
    //   console.log(navigation);
    // });
    console.log(this.url);
  }

}
