import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { HomeService } from '@home/services/home.service'
import { Item } from '@home/models/item'
import { ActivatedRoute, Router } from '@angular/router'
import { first, take } from 'rxjs/operators'
import { CartService } from '@modules/cart/services/cart.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  page= Number(this.route.snapshot.paramMap.get('page'))
  
  items$!: Observable <Item[]>
  count!: number  
  isHeader = this.route.snapshot.queryParamMap.get('header')

  ngOnInit() {
        
    console.log(this.items$);
    this.items$ = this.homeService.setItems(
      this.page,
      this.route.snapshot.queryParamMap.get('input') || ''
    )
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.homeService.count$.pipe(take(2)).subscribe((data) => (this.count = data))
  }

  addCart(itemName: string) {
    this.cartService.addCart(itemName)
  }
}
