import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { GlobalVariable } from '@shared/globalVariable'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<any>(
        `${GlobalVariable.API_URL}/user/login`,
        { username, password },
        { observe: 'response' }
      )
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.body.token)
        })
      )
  }

  register(user: any) {
    return this.http
      .post<any>(`${GlobalVariable.API_URL}/user/register`, user, { observe: 'response' })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.body.token)
        })
      )
  }

  logout() {
    localStorage.removeItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }
}
