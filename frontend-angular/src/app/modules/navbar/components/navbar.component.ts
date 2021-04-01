import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'
import { CartItem } from '@home/components/models/cartItem'
import { HomeService } from '@home/services/home.service'
import { CartConnectedService } from '@modules/cart/services/cartConnected.service'
import { CartGuestService } from '@modules/cart/services/cartGuest.service'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cartConnectedService: CartConnectedService,
    private router: Router,
    private homeService: HomeService,
    private cartGuestService: CartGuestService
  ) {}

  cartItems!: BehaviorSubject<CartItem[]>
  total!: BehaviorSubject<number>

  ngOnInit() {
    if (this.loggedIn()) {
      this.cartConnectedService.setCart()
      this.cartItems = this.cartConnectedService.cartItems
      this.total = this.cartConnectedService.total
    } else {
      this.cartGuestService.setCart()
      this.cartItems = this.cartGuestService.cartItems
      this.total = this.cartGuestService.total
    }
    console.log(this.cartGuestService.total.value)
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
