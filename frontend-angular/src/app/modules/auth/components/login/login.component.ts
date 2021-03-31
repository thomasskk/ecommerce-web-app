import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '@auth/services/auth.service'
import { Location } from '@angular/common'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private fbuilder: FormBuilder,
    private location: Location
  ) {}

  hide = true

  loginForm = this.fbuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  login() {
    this.authService
      .login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .subscribe(
        (success) => this.location.back(),
        (error) => alert(error.error.message)
      )
  }
}
