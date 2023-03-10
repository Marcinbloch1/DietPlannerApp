import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { NavigationExtras, Router } from '@angular/router'
import { ToastService } from '../services/toast/toast.service'
import { catchError } from 'rxjs/operators'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastService: ToastService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = []
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key])
                  }
                }
                this.toastService.errorLoading(modalStateErrors.flat())
                throw modalStateErrors.flat()
              } else {
                this.toastService.presentToast(
                  `${error.status} ${
                    error.statusText === 'OK'
                      ? 'Bad Request: ' + error.error
                      : error.statusText
                  }`,
                  'danger'
                )
              }
              break

            case 401:
              this.toastService.presentToast(
                `${error.status} ${
                  error.statusText === 'OK' ? 'Unauthorized' : error.statusText
                }`,
                'danger'
              )
              break

            case 404:
              this.router.navigateByUrl('/not-found')
              break

            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              }
              this.router.navigateByUrl('/server-error', navigationExtras)
              break

            default:
              this.toastService.presentToast(
                'Something unexpected went wrong',
                'danger'
              )
              console.log(error)
              break
          }
        }
        return throwError(error)
      })
    )
  }
}
