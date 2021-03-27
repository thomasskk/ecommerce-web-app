import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { CartService } from '@cart/services/cart.service'
import { CartItem } from '@cart/models/cartItem'

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
    this.cartService.getCart().subscribe((data) => ((this.cartItems = data), this.setTotal()))
  }

  removeItem(itemName: string) {
    this.cartService.removeCartItem(itemName).subscribe()
    this.cartItems = this.cartItems.filter((item) => item.name != itemName)
    this.setTotal()
  }

  setTotal() {
    this.total = 0
    for (let item of this.cartItems) {
      this.total += item.price * item.quantity
    }
  }
}
