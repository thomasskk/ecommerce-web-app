import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CartItem } from '@modules/home/components/models/cartItem'
import { GlobalVariable } from '@shared/globalVariable'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class CartGuestService {
  constructor(private http: HttpClient) {}

  total = new BehaviorSubject<number>(0)
  cartItems = new BehaviorSubject<CartItem[]>([])

  setCart() {
    this.cartItems.next(JSON.parse(localStorage.getItem('cartGuest') || '[]'))
    this.setTotal()
  }

  addCart(itemName: string) {
    this.http
      .get<any>(`${GlobalVariable.API_URL}/item/get/`, {
        params: {
          name: itemName,
        },
      })
      .pipe(
        map((item) => {
          return new CartItem(
            item.name,
            item.name.split(/;|-/)[0],
            item.image.split(',')[0].replace(/^http:\/\//i, 'https://'),
            item.price,
            1,
            item.stock
          )
        })
      )
      .subscribe((itemData) => {
        const index = this.cartItems.value.findIndex((item) => {
          return item.dname === itemData.dname
        })

        index === -1
          ? this.cartItems.next([...this.cartItems.value, itemData])
          : this.cartItems.value[index].quantity++

        localStorage.setItem('cartGuest', JSON.stringify(this.cartItems.value))
        this.setTotal()
      })
  }

  setTotal() {
    this.total.next(0)
    for (const item of this.cartItems.value) {
      this.total.next(this.total.value + item.price * item.quantity)
    }
  }

  removeCartItem(itemName: string, index: number) {

    this.cartItems.value.splice(index, 1)

    this.setTotal()
    localStorage.setItem('cartGuest', JSON.stringify(this.cartItems.value))
  }

  changeQuantity(itemName: string, quantity: string, index: number) {
    this.cartItems.value[index].quantity = Number(quantity)
    this.setTotal()
    localStorage.setItem('cartGuest', JSON.stringify(this.cartItems.value))
  }
}
