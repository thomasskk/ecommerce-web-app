import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Item } from '@shared/models/Item'
import { GlobalVariable } from '@shared/globalVariable'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class CartGuestService {
  constructor(private http: HttpClient) {}

  total = new BehaviorSubject<number>(0)
  cartItems = new BehaviorSubject<Item[]>([])

  setCart() {
    this.cartItems.next(JSON.parse(localStorage.getItem('cartGuest') || '[]'))
    this.setTotal()
  }

  addCart(itemData: Item) {
    const index = this.cartItems.value.findIndex((item) => {
      return item.dname === itemData.dname
    })

    if (index === -1) {
      this.cartItems.next([...this.cartItems.value, itemData])
    } else {
      this.cartItems.value[index].quantity++
    }

    localStorage.setItem('cartGuest', JSON.stringify(this.cartItems.value))
    this.setTotal()
  }

  setTotal() {
    this.total.next(0)
    for (const item of this.cartItems.value) {
      this.total.next(this.total.value + item.price * item.quantity)
    }
  }

  removeCartItem(index: number) {
    this.cartItems.value.splice(index, 1)
    this.setTotal()
    localStorage.setItem('cartGuest', JSON.stringify(this.cartItems.value))
  }

  changeQuantity(quantity: string, index: number) {
    this.cartItems.value[index].quantity = Number(quantity)
    this.setTotal()
    localStorage.setItem('cartGuest', JSON.stringify(this.cartItems.value))
  }
}
