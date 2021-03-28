import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { catchError, tap, map } from 'rxjs/operators'
import { Item } from '@home/models/item'

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  private readonly Url = 'http://localhost:1337'

  setItems(skip: number): Observable<Item[]> {
    return this.http.get<any>(`${this.Url}/item/${skip}`).pipe(
      map((res) => {
        return res.map((item: any) => {
          return new Item(
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
    return this.http.post<any>(`${this.Url}/cart/add/${itemName}`, null)
  }
}
