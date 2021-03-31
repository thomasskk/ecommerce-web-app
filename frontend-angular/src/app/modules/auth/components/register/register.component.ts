import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Location } from '@angular/common'
import { AuthService } from '@auth/services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private fbuilder: FormBuilder,
    private location: Location
  ) {}
  selectedGender = null

  registerForm = this.fbuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    adress: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    password: ['', [Validators.required]],
    passwordCheck: ['', [Validators.required]],
  })

  register() {
    this.authService.register(this.registerForm.value).subscribe(
      (success) => this.location.back(),
      (error) => alert(error.error.message)
    )
  }
}
