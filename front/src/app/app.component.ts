import { Component, OnInit } from '@angular/core'
import { User } from './models/user'
import { LoginService } from './services/login/login.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  user: User

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.setCurrentUser()
  }

  setCurrentUser() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.loginService.setCurrentUser(this.user)
  }
}
