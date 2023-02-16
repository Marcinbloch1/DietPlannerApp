import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular'
import { LoginService } from 'src/app/services/login/login.service'
import { MacroService } from 'src/app/services/macro/macro.service'
import { ToastService } from 'src/app/services/toast/toast.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validationMessages = {
    username: [{ type: 'required', message: 'Please Enter your username' }],

    password: [
      { type: 'required', message: 'Password is required here' },
      { type: 'minlength', message: 'Password must be at least 6 character' },
    ],
  }

  form: FormGroup

  password = new FormControl(
    '',
    Validators.compose([Validators.required, Validators.minLength(6)])
  )

  username = new FormControl('', Validators.compose([Validators.required]))

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService,
    private macroService: MacroService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: this.password,
      username: this.username,
    })
  }

  register() {
    const val = this.form.getRawValue()

    try {
      this.loginService.registerUser(val).subscribe(
        (res) => {
          this.toastService.presentToast('Register succesfull', 'success')

          this.macroService.getMacro().subscribe((res) => {
            this.router.navigateByUrl('/tabs')
          })
        },
        (err) => {}
      )
    } catch (err) {}
  }

  goToRegister() {
    this.router.navigateByUrl('register')
  }

  goToLogin() {
    this.router.navigateByUrl('login')
  }
}
