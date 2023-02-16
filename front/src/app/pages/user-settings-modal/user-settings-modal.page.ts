import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'
import { ModalController } from '@ionic/angular'
import { User } from 'src/app/models/user'
import { LoginService } from 'src/app/services/login/login.service'
import { ToastService } from 'src/app/services/toast/toast.service'

@Component({
  selector: 'app-user-settings-modal',
  templateUrl: './user-settings-modal.page.html',
  styleUrls: ['./user-settings-modal.page.scss'],
})
export class UserSettingsModalPage implements OnInit {
  @Input() user: User

  validationMessages = {
    username: [
      { type: 'required', message: 'Please enter your Username' },
      {
        type: 'pattern',
        message: 'The Username entered is Incorrect. Try again',
      },
    ],
  }

  form: FormGroup

  username = new FormControl('', Validators.compose([Validators.required]))

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loginService.currentUser$.subscribe((res) => {
      this.user = res
    })
    this.form = this.formBuilder.group({
      username: this.username,
    })
  }

  register() {
    this.toastService.showalert()

    const val = this.form.getRawValue()

    try {
      this.loginService.registerUser(val).subscribe(
        (res) => {
          this.toastService.presentToast('Login succesfull', 'success')
          this.toastService.loadingDismiss()
          this.router.navigateByUrl('tabs')
        },
        (err) => {
          this.toastService.loadingDismiss()
          this.toastService.errorLoading(err.error)
          this.toastService.presentToast(err.error, 'danger')
        }
      )
    } catch (err) {}
  }

  goToRegister() {
    this.router.navigateByUrl('register')
  }

  goToLogin() {
    this.router.navigateByUrl('login')
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    })
  }
}
