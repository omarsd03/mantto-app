import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [PagenotfoundComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule
  ],
  exports: [PagenotfoundComponent, HeaderComponent, SidebarComponent]
})
export class SharedModule { }
