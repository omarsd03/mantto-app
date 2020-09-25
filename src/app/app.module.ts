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

import { AuthGuard } from './guards/auth.guard';

// Fontawsome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Scanner
import { ZXingScannerModule } from '@zxing/ngx-scanner';

// Ng2Chats
import { ChartsModule } from 'ng2-charts';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';


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
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
