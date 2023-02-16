import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersUrl = environment.apiUrl + '/Users'
  // private welcomeUrl = environment.apiUrl + '/welcome'

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.usersUrl)
  }

  // getWelcome(): Observable<any> {
  //   return this.http.get(this.welcomeUrl)
  // }

  getUserData(id: string): Observable<any> {
    return this.http.get(this.usersUrl + '/' + id)
  }
}
