import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.page = parseInt(params['page'])
    })
  }

  cartCount: number = 0
  page: number = 0

  loggedIn() {
    return this.authService.loggedIn()
  }

  logout() {
    this.authService.logout()
  }
}
