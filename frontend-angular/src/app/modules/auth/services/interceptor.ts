import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class TokenInterceptorRequest implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`),
    })
    return next.handle(req)
  }
}

