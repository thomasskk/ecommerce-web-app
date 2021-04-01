import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './shared/material.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RouterModule } from '@angular/router'

//Component
import { NavbarComponent } from './modules/navbar/components/navbar.component'
import { HomeComponent } from './modules/home/components/home.component'
import { LoginComponent } from './modules/auth/components/login/login.component'
import { RegisterComponent } from './modules/auth/components/register/register.component'
import { AuthService } from './modules/auth/services/auth.service'
import { HttpErrorInterceptor, TokenInterceptor } from './modules/auth/services/interceptor'
import { CartComponent } from './modules/cart/components/cart.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
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
  bootstrap: [AppComponent],
})
export class AppModule {}