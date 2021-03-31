import { Component, OnInit } from '@angular/core'
import { EmptyError, Observable } from 'rxjs'
import { HomeService } from '@home/services/home.service'
import { Item } from '@home/models/item'
import { ActivatedRoute, Router } from '@angular/router'
import { map, take } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  page!: number
  items$!: Observable<Item[]>
  count!: number
  isHeader = this.route.snapshot.queryParamMap.get('header')

  async ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false

    this.page = Number(this.route.snapshot.paramMap.get('page'))
    this.items$ = this.homeService.setItems(
      this.page,
      this.route.snapshot.queryParamMap.get('input') || ''
    )
    this.homeService.count.subscribe(data=> this.count = data)    
  }

  addCart(itemName: string) {
    this.homeService.addCart(itemName).subscribe()
  }
}


