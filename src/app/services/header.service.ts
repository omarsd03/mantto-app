import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public menu = [];

  cargarMenu() {
    return this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }
  
}
