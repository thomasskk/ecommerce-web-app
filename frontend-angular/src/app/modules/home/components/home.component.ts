import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { HomeService } from '@home/services/home.service'
import { Item } from '@home/models/item'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService, private route: ActivatedRoute) {}

  page: number = 0
  items$!: Observable<Item[]>

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.page = Number(params['page'])
      this.setList()
    })
  }

  setList() {
    this.items$ = this.homeService.setItems(this.page)
  }

  changePage(state: number) {
    this.page += state
    window.scroll(0, 0)
    this.setList()
  }

  addCart(itemName: string) {
    this.homeService.addCart(itemName).subscribe()
  }
}
