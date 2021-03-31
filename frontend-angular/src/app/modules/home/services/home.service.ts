import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { Item } from '@home/models/item'
import { GlobalVariable } from '@shared/globalVariable'
import { ActivatedRoute } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  count = new BehaviorSubject<number>(0)

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
              item.image.split(',')[0].replace(/^http:\/\//i, 'https://'),
              parseInt(item.price.toString().split('.')[0]),
              item.stock
            )
          })
        }),shareReplay()
      )
  }
}
