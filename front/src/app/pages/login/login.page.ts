import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular'
import { MacroService } from 'src/app/services/macro/macro.service'
import { ToastService } from 'src/app/services/toast/toast.service'
import { LoginService } from '../../services/login/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validationUserMessage = {
    email: [
      { type: 'required', message: 'Please enter your Email' },
      { type: 'pattern', message: 'The Email entered is Incorrect. Try again' },
    ],
    password: [
      { type: 'required', message: 'Please Enter your Password' },
      {
        type: 'minlength',
        message: 'The Password must be at least 6 characters or more',
      },
    ],
  }

  form: FormGroup

  username = new FormControl('')

  email = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
    ])
  )

  password = new FormControl(
    '',
    Validators.compose([Validators.required, Validators.minLength(4)])
  )

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService,
    private macroService: MacroService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: this.username,
      password: this.password,
    })
  }

  login() {
    const val = this.form.getRawValue()

    this.loginService.loginUser(val).subscribe(
      (res) => {
        this.toastService.presentToast('Login succesfull', 'success')
        this.macroService.getMacro().subscribe((res) => {
          this.router.navigateByUrl('/tabs')
        })
      },
      (err) => {}
    )
  }

  goToRegister() {
    this.router.navigateByUrl('register')
  }
}
