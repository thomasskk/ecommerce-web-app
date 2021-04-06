import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Item } from '@shared/models/Item'
import { GlobalVariable } from '@shared/globalVariable'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  count$ = new BehaviorSubject<number>(0)

  setItems(skip: number, input: string): Observable<Item[]> {
    return this.http
      .get<any>(`${GlobalVariable.API_URL}/item/page/`, {
        params: {
          skip: String(skip),
          input: input,
        },
      })
      .pipe(
        map((res) => {
          this.count$.next(res.count)
          console.log(res.item);
          
          return res.item.map((item: any) => {
            return new Item(
              item.name,
              item.name.split(/;|-/)[0],
              item.image,
              parseInt(item.price.toString().split('.')[0]),
              item.stock,
              1
            )
          })
        }),
        shareReplay()
      )
  }
}
