import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { HeaderService } from '../../services/header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public menu: any = [];

  constructor(public router: Router, 
              private usuarioService: UsuarioService, 
              private headerService: HeaderService) { }

  ngOnInit(): void {
    this.menu = this.headerService.cargarMenu();
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

}