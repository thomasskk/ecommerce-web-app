import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { tap, map } from 'rxjs/operators'
import { CartItem } from '@modules/home/components/models/cartItem'
import { GlobalVariable } from '@shared/globalVariable'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

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

  removeCartItem(itemName: string) {
    return this.http.post<any>(`${GlobalVariable.API_URL}/cart/remove/${itemName}`, null)
  }

  changeQuantity(itemName: string, quantity : number){   
    return this.http.post<any>(`${GlobalVariable.API_URL}/cart/${quantity}/${itemName}`, null)
  }
}
