import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Item } from '@shared/models/Item'
import { GlobalVariable } from '@shared/globalVariable'
import { BehaviorSubject } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class CartConnectedService {
  constructor(private http: HttpClient) {}

  total = new BehaviorSubject<number>(0)
  cartItems = new BehaviorSubject<Item[]>([])

  setCart() {
    this.http
      .get<any>(`${GlobalVariable.API_URL}/cart/get/`)
      .pipe(
        map((res) => {
          return res.map((item: any) => {
            return new Item(
              item.item.name,
              item.item.name.split(/;|-/)[0],
              item.item.image.split(',')[0].replace(/^http:\/\//i, 'https://'),
              item.item.price,
              item.item.stock,
              item.quantity
            )
          })
        })
      )
      .subscribe((data) => {
        this.cartItems.next(data)
        this.setTotal()
      })
  }

  addCart(itemName: string) {
    this.http
      .post<any>(`${GlobalVariable.API_URL}/cart/add/`, null, {
        params: {
          name: itemName,
        },
      })
      .subscribe((success) => this.setCart())
  }

  setTotal() {
    this.total.next(0)
    for (let item of this.cartItems.value) {
      this.total.next(this.total.value + item.price * item.quantity)
    }
  }

  removeCartItem(itemName: string, index: number) {
    this.cartItems.value.splice(index, 1)
    this.setTotal()
    this.http
      .post<any>(`${GlobalVariable.API_URL}/cart/remove/`, null, {
        params: {
          name: itemName,
        },
      })
      .subscribe()
  }

  changeQuantity(itemName: string, quantity: string, index: number) {
    this.cartItems.value[index].quantity = Number(quantity)
    this.setTotal()
    this.http
      .post<any>(`${GlobalVariable.API_URL}/cart/quantity/`, null, {
        params: {
          name: itemName,
          quantity: String(quantity),
        },
      })
      .subscribe()
  }
}
