import { Component, OnInit, ViewChild } from '@angular/core'
import { AuthService } from '@auth/services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  cartCount: number = 0

  loggedIn() {
    return this.authService.loggedIn()
  }

  logout() {
    this.authService.logout()
  }
}
