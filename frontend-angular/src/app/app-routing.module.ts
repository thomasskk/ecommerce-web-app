import { Component, NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './modules/home/components/home.component'
import { LoginComponent } from './modules/auth/components/login/login.component'
import { RegisterComponent } from './modules/auth/components/register/register.component'
import { CartComponent } from './modules/cart/components/cart.component'

const routes: Routes = [
  { path: '', redirectTo: 'home/0', pathMatch: 'full' },
  { path: 'home/:page', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
