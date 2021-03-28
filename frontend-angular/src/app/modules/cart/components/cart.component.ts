import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
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
    this.cartService.getCart().subscribe((data) => ((this.cartItems = data), this.setTotal()))
  }

  removeItem(itemName: string, index: number) {
    this.cartService.removeCartItem(itemName).subscribe((success) => {
      this.cartItems.splice(index, 1)
      this.setTotal()
    })
  }

  changeQuantity(itemName: string, quantity: string, index: number) {
    this.cartService.changeQuantity(itemName, Number(quantity)).subscribe((success) => {
      this.cartItems[index].quantity = Number(quantity)
      this.setTotal()
    })
  }

  setTotal() {
    this.total = 0
    for (let item of this.cartItems) {
      this.total += item.price * item.quantity
    }
  }
}
