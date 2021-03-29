import { Component, OnInit } from '@angular/core'
import { CartService } from '@cart/services/cart.service'
import { CartItem } from '@home/components/models/cartItem'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  total!: number
  cartItems!: CartItem[]

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.setCart()
    this.cartService.cartItems$.subscribe(
      (data) => ((this.cartItems = data), this.cartService.setTotal())
    )
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
}
