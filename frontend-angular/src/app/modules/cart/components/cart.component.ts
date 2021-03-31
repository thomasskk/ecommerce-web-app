import { Component, OnInit } from '@angular/core'
import { CartService } from '@cart/services/cart.service'
import { CartItem } from '@home/components/models/cartItem'
import { AuthService } from '@modules/auth/services/auth.service'
import { Item } from '@modules/home/models/item'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  total!: number
  cartItems$!: Observable<CartItem[]>

  constructor(private cartService: CartService,
    private authService: AuthService) {}

  ngOnInit() {
    this.cartService.setCart()
    this.cartItems$ = this.cartService.cartItems$
    this.cartService.setTotal()
    this.cartService.total$.subscribe((data) => (this.total = data))
  }

  removeCartItem(itemName: string, index: number) {
    this.cartService.removeCartItem(itemName, index)
  }

  changeQuantity(itemName: string, quantity: string, index: number) {
    this.cartService.changeQuantity(itemName, quantity, index)
  }

  setTotal() {
    this.cartService.setTotal()
  }

  loggedIn (){
    return this.authService.loggedIn()
  }

}
