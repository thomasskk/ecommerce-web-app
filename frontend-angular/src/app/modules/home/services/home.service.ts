import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs'
import { map, share } from 'rxjs/operators'
import { Item } from '@home/models/item'
import { GlobalVariable } from '@shared/globalVariable'
import { ActivatedRoute } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  
  count = new BehaviorSubject<number>(0)
  count$ = this.count.asObservable()

  setItems(skip: number, input: string): Observable<Item[]> {
    return this.http
      .get<any>(`${GlobalVariable.API_URL}/item/`, {
        params: {
          skip: String(skip),
          input: input,
        },
      })
      .pipe(
        map((res) => {
          this.count.next(res.count)
          return res.item.map((item: any) => {
            return new Item(
              item.name,
              item.name.split(/;|-|\(/)[0],
              item.image.split(',')[0],
              parseInt(item.price.toString().split('.')[0]),
              item.stock,
            )
          })
        }),share()
      )
  }

  addCart(itemName: string) {
    return this.http.post<any>(`${GlobalVariable.API_URL}/cart/add/${itemName}`, null)
  }
}
