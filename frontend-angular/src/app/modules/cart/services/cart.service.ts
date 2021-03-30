import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CartItem } from '@modules/home/components/models/cartItem'
import { GlobalVariable } from '@shared/globalVariable'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  constructor(private http: HttpClient) {}

  total = new BehaviorSubject<number>(0)
  cartItems = new BehaviorSubject<CartItem[]>([])
  total$ = this.total.asObservable()
  cartItems$ = this.cartItems.asObservable()

  getCart(): Observable<CartItem[]> {
    return this.http.get<any>(`${GlobalVariable.API_URL}/cart/`).pipe(
      map((res) => {
        return res.map((item: any) => {
          return new CartItem(
            item.item.name,
            item.item.name.split(/;|-/)[0],
            item.item.image.split(',')[0],
            item.item.price,
            item.quantity,
            item.item.stock
          )
        })
      })
    )
  }

  setCart() {
    this.getCart().subscribe((data) => this.cartItems.next(data))
  }

  removeCartItem(itemName: string, index: number) {
    this.cartItems.value.splice(index, 1)
    this.setTotal()
    this.http.post<any>(`${GlobalVariable.API_URL}/cart/remove/${itemName}`,null).subscribe()
  }

  changeQuantity(itemName: string, quantity: string, index: number) {
    this.cartItems.value[index].quantity = Number(quantity)
    this.setTotal()
    this.http.post<any>(`${GlobalVariable.API_URL}/cart/${quantity}/${itemName}`, null).subscribe()
  }

  setTotal() {
    this.total.next(0)
    for (let item of this.cartItems.value) {
      this.total.next(this.total.value + item.price * item.quantity)
    }
  }
}
