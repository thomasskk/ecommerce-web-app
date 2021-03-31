import { Component, OnInit } from '@angular/core'
import { CartService } from '@cart/services/cart.service'
import { CartItem } from '@home/components/models/cartItem'
import { AuthService } from '@modules/auth/services/auth.service'
import { shareReplay } from 'rxjs/operators'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  total$ = this.cartService.total
  cartItems$ = this.cartService.cartItems.pipe(shareReplay())

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit() {}

  removeCartItem(itemName: string, index: number) {
    this.cartService.removeCartItem(itemName, index)
  }

  changeQuantity(itemName: string, quantity: string, index: number) {
    this.cartService.changeQuantity(itemName, quantity, index)
  }

  setTotal() {
    this.cartService.setTotal()
  }

  loggedIn() {
    return this.authService.loggedIn()
  }
}
