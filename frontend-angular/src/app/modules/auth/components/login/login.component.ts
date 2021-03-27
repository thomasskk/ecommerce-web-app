import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '@auth/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private fbuilder: FormBuilder,
    private router: Router
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
        (success) => this.router.navigate(['/home/0']),
        (error) => alert(error.error.message)
      )
  }
}
