import { Component, OnInit } from '@angular/core'
import { AuthService } from '@auth/services/auth.service'
import { CartService } from '@cart/services/cart.service'
import { CartItem } from '@home/components/models/cartItem'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private cartService: CartService) {}

  cartItems!: CartItem[]
  total!: number

  ngOnInit() {
    this.getCart()
  }

  getCart() {
    this.cartService.setCart()
    this.cartService.cartItems$.subscribe(
      (data) => ((this.cartItems = data), this.cartService.setTotal())
    )
    this.cartService.total$.subscribe((data) => (this.total = data))
  }

  loggedIn() {
    return this.authService.loggedIn()
  }

  logout() {
    this.authService.logout()
  }
}
