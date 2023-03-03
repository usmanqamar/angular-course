import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AuthGuardService } from './app/shared.module/guards/auth-guard.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { importProvidersFrom } from '@angular/core';
import { RequestInterceptorService } from './app/core.module/interceptor/request.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    AuthGuardService, // Either here or through provided root paam in injector
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(AppRoutingModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },
  ],
});
