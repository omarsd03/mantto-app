import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCheck, faClipboardList, faCoffee, faExclamationTriangle, faHistory, faSignOutAlt, faWrench } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [PagenotfoundComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [PagenotfoundComponent, HeaderComponent, SidebarComponent]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faCoffee, faWrench, faCheck, faExclamationTriangle, faHistory, faClipboardList, faSignOutAlt);
  }
}
