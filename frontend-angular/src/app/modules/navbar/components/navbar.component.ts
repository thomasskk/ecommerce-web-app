import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'
import { CartService } from '@cart/services/cart.service'
import { CartItem } from '@home/components/models/cartItem'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  cartItems!: CartItem[]
  total!:0;
  ngOnInit() {
    
  }

  getCart(){
    this.cartService.getCart().subscribe((data) => (this.cartItems = data))    
  }

  loggedIn() {
    return this.authService.loggedIn()
  }

  logout() {
    this.authService.logout()
  }
}
