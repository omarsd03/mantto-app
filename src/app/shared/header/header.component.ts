import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faWrench, faCheck, faExclamationTriangle, faHistory, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  faWrench = faWrench;
  faCheck = faCheck;
  faExclamationTriangle = faExclamationTriangle;
  faHistory = faHistory;
  faSignOutAlt = faSignOutAlt;

  constructor(public router: Router, private usuarioService: UsuarioService) { }

  logout() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

}
