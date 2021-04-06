import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './modules/auth/components/login/login.component'
import { RegisterComponent } from './modules/auth/components/register/register.component'
import { AuthService } from './modules/auth/services/auth.service'
import { HttpErrorInterceptor, TokenInterceptor } from './modules/auth/services/interceptor'
import { CartComponent } from './modules/cart/components/cart.component'
import { HomeComponent } from './modules/home/components/home.component'
import { NavbarComponent } from './modules/navbar/components/navbar.component'
import { MaterialModule } from './shared/material.module'
import {SafePipe} from '@shared/pipe/safe.pipe'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    [SafePipe]

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
