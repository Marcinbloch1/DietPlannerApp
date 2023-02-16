import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  gotoLoginpage() {
    //this.nav.navigateForward(['loginscreen']);
    this.router.navigateByUrl('login')
  }

  registerUser() {
    //this.nav.navigateForward(['signup'])
    this.router.navigateByUrl('register')
  }

  loginwithFacebook() {}
  googlePlusLogin() {}
}
