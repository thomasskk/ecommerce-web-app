import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'
import { CartConnectedService } from '@cart/services/cartConnected.service'
import { CartGuestService } from '@cart/services/cartGuest.service'
import { Item } from '@home/models/item'
import { HomeService } from '@home/services/home.service'
import { Observable } from 'rxjs'
import { take } from 'rxjs/operators'

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
    private cartConnectedService: CartConnectedService,
    private authService: AuthService,
    private cartGuestService: CartGuestService
  ) {}

  page = Number(this.route.snapshot.paramMap.get('page'))

  items$!: Observable<Item[]>
  count!: number
  isHeader = this.route.snapshot.queryParamMap.get('header')

  ngOnInit() {
    this.items$ = this.homeService.setItems(
      this.page,
      this.route.snapshot.queryParamMap.get('input') || ''
    )
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.homeService.count$.pipe(take(2)).subscribe((data) => (this.count = data))
  }

  addCart(itemName: string) {
    if (this.authService.loggedIn()) {
      this.cartConnectedService.addCart(itemName)
    } else {
      this.cartGuestService.addCart(itemName)
    }
  }
}
