import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { tap, map } from 'rxjs/operators'
import { Item } from '@home/models/item'
import { GlobalVariable } from '@shared/globalVariable'

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  setItems(skip: number): Observable<Item[]> {
    return this.http.get<any>(`${GlobalVariable.API_URL}/item/${skip}`).pipe(
      map((res) => {
        return res.map((item: any) => {
          return new Item(
            item.name,
            item.name.split(/;|-|\(/)[0],
            item.image.split(',')[0],
            parseInt(item.price.toString().split('.')[0]),
            item.stock
          )
        })
      })
    )
  }

  addCart(itemName: string) {
    return this.http.post<any>(`${GlobalVariable.API_URL}/cart/add/${itemName}`, null)
  }
}
