import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faWrench, faCheck, faExclamationTriangle, faHistory, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { UsuarioService } from '../../services/usuario.service';
import { HeaderService } from '../../services/header.service';
import { SwPush } from '@angular/service-worker';
import { NotificacionesService } from '../../services/notificaciones.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // readonly VAPID_PUBLIC_KEY = "BHjIoB9F03UAYERcXvgaLcpPN_aru8rs03gtZ_aEPPTwJwwlBzkRaJg14ny_Y0DeKfR3xBDVF9CuGPvlcXEvZAc";
  private VAPID_PUBLIC_KEY: string;

  public menu: any = [];

  faWrench = faWrench;
  faCheck = faCheck;
  faExclamationTriangle = faExclamationTriangle;
  faHistory = faHistory;
  faSignOutAlt = faSignOutAlt;

  constructor(public router: Router, 
              private usuarioService: UsuarioService, 
              private headerService: HeaderService) { }

  ngOnInit(): void {
    this.menu = this.headerService.cargarMenu();
    // this.webPushNotificationsService.requestPermission();
    // this.obtenerKey();
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

  // obtenerKey() {

  //   this.notificaciones.getKey().subscribe( (resp: any) => {
  //     if (resp.ok) {
  //       this.VAPID_PUBLIC_KEY = resp.key
  //     } else {
  //       console.log('Error al obtener key');
  //     }
  //   });

  // }

  // suscribir() {

  //   if (this.swPush.isEnabled) {
      
  //     this.swPush.requestSubscription({
  //       serverPublicKey: this.VAPID_PUBLIC_KEY
  //     }).then(sub => this.notificaciones.addPushSubscriber(sub).subscribe(resp => {
  //       console.log(resp);
  //     })).catch(err => console.error("Could not subscribe to notifications", err));

  //   } else {
  //     console.log('El SW no esta activado');
  //   }


  // }

}