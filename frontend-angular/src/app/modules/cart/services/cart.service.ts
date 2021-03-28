import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { tap, map } from 'rxjs/operators'
import { CartItem } from '@modules/home/components/models/cartItem'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  private readonly Url = 'http://localhost:1337'

  getCart(): Observable<CartItem[]> {
    return this.http.get<any>(`${this.Url}/cart/`).pipe(
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

  removeCartItem(itemName: string) {
    return this.http.post<any>(`${this.Url}/cart/remove/${itemName}`, null)
  }

  changeQuantity(itemName: string, quantity : number){   
    return this.http.post<any>(`${this.Url}/cart/${quantity}/${itemName}`, null)
  }
}
