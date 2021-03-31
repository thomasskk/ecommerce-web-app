import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'
import { CartService } from '@cart/services/cart.service'
import { CartItem } from '@home/components/models/cartItem'
import { HomeService } from '@home/services/home.service'
import { shareReplay } from 'rxjs/operators'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private homeService: HomeService
  ) {}

  cartItems$ = this.cartService.cartItems
  total$ = this.cartService.total

  ngOnInit() {
    this.cartService.setCart()
  }

  loggedIn() {
    return this.authService.loggedIn()
  }

  logout() {
    this.authService.logout()
    window.location.reload()
  }

  search() {
    let input = (<HTMLInputElement>document.getElementById('input')).value
    input = input.trim().replace(/\s+/g, ' ')
    this.router.navigate([''], { queryParams: { input, header: 0 } })
  }
}
