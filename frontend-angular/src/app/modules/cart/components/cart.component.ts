import { Component, OnInit } from '@angular/core'
import { CartGuestService } from '@cart/services/cartGuest.service'
import { CartItem } from '@home/components/models/cartItem'
import { AuthService } from '@modules/auth/services/auth.service'
import { CartConnectedService } from '@modules/cart/services/cartConnected.service'
import { BehaviorSubject } from 'rxjs'
import { shareReplay } from 'rxjs/operators'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  total$!:BehaviorSubject<number>
  cartItems$!: BehaviorSubject<CartItem[]>

  constructor(
    private cartConnectedService: CartConnectedService,
    private authService: AuthService,
    private cartGuestService: CartGuestService
  ) {}

  ngOnInit() {
    if (this.loggedIn()) {
      this.cartItems$ = this.cartConnectedService.cartItems
      this.total$ = this.cartConnectedService.total
    } else {
      this.cartGuestService.setCart()
      this.cartItems$ = this.cartGuestService.cartItems
      this.total$ = this.cartGuestService.total
    }
  }

  removeCartItem(itemName: string, index: number) {
    this.loggedIn()
      ? this.cartConnectedService.removeCartItem(itemName, index)
      : this.cartGuestService.removeCartItem(itemName, index)
  }

  changeQuantity(itemName: string, quantity: string, index: number) {
    this.loggedIn()
      ? this.cartConnectedService.changeQuantity(itemName, quantity, index)
      : this.cartGuestService.changeQuantity(itemName, quantity, index)
  }

  setTotal() {
    this.loggedIn() ? this.cartConnectedService.setTotal() : this.cartGuestService.setTotal()
  }

  loggedIn() {
    return this.authService.loggedIn()
  }
}
