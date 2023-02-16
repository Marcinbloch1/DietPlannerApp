import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { LoginService } from '../services/login/login.service'
import { ToastService } from '../services/toast/toast.service'

@Injectable({
  providedIn: 'root',
})
export class LoggedInAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastService: ToastService,
    private loginService: LoginService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.loginService.currentUser$.pipe(
      map((user) => {
        if (user === null) return true
        this.router.navigateByUrl('/')
        this.toastService.presentToast('No access for this route', 'danger')
      })
    )
  }
}
