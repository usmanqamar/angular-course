import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared.module/shared.module';
import { HeaderComponent } from './header/header.component';
import { StandaloneComponent } from './standalone/standalone.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    StandaloneComponent,
    AppComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
