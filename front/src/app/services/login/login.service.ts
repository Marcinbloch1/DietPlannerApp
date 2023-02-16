import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { FormBuilder } from '@angular/forms'
import { Observable, ReplaySubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { User } from 'src/app/models/user'
import { MacroService } from '../macro/macro.service'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private registerUrl = environment.apiUrl + '/Account/register'
  private loginUrl = environment.apiUrl + '/Account/login'
  private deleteUrl = environment.apiUrl + '/Account'
  private logoutUrl = environment.apiUrl + '/Account/logout'

  private currentUserSource = new ReplaySubject<User>(1)
  currentUser$ = this.currentUserSource.asObservable()

  constructor(private http: HttpClient, private macroService: MacroService) {}

  getUserToken(): string {
    return localStorage.getItem('token')
  }

  registerUser(form: FormBuilder): Observable<any> {
    return this.http.post(this.registerUrl, form).pipe(
      map((res: User) => {
        const user = res
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user)
        }
        return user
      })
    )
  }

  loginUser(form: FormBuilder): Observable<any> {
    return this.http.post(this.loginUrl, form).pipe(
      map((res: User) => {
        const user = res
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user)
        }
        return user
      })
    )
  }

  deleteUser(): Observable<any> {
    return this.http.delete(this.deleteUrl)
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user)
  }

  logoutUser() {
    localStorage.removeItem('user')
    this.currentUserSource.next(null)
    this.macroService.removeCurrentMacro()
  }
}
