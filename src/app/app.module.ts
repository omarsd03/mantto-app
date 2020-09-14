import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Modulos
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';

// Fontawsome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Scanner
import { ZXingScannerModule } from '@zxing/ngx-scanner';

// Ng2Chats
import { ChartsModule } from 'ng2-charts';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ZXingScannerModule,
    ChartsModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    PagesModule,
    AuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
