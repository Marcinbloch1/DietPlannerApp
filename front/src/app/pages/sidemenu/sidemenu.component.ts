import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {
  ToastController,
  MenuController,
  ActionSheetController,
  AlertController,
  ModalController,
} from '@ionic/angular'
import { LoginService } from 'src/app/services/login/login.service'
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service'
import { UsersService } from 'src/app/services/users/users.service'
import { Storage } from '@ionic/storage-angular'
import { ToastService } from 'src/app/services/toast/toast.service'
import { UserSettingsModalPage } from '../user-settings-modal/user-settings-modal.page'
import { User } from 'src/app/models/user'
import { Observable, Subscription } from 'rxjs'

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit, OnDestroy {
  userNames: string
  userEmail: string
  theme: string = 'light'
  isChecked: boolean

  //user: User
  subsciption: Subscription

  constructor(
    public loginService: LoginService,
    private router: Router,
    private storage: Storage,
    private menu: MenuController,
    private sharedService: SharedDataService,
    private usersService: UsersService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastService: ToastService,
    public modalController: ModalController
  ) {}

  async ngOnInit() {
    await this.storage.create()
    const theme = await this.storage.get('theme')

    if (theme === 'dark') {
      document.body.classList.add('dark')
      this.isChecked = true
    }
  }

  ngOnDestroy(): void {}

  onToggleColorTheme(event) {
    if (event.detail.checked) {
      document.body.classList.add('dark')
      this.storage.set('theme', 'dark')
    } else {
      document.body.classList.remove('dark')
      this.storage.set('theme', 'light')
    }
  }

  logout() {
    this.loginService.logoutUser()

    this.toastService.presentToast('Logout succesfull', 'success')
    this.router.navigateByUrl('/home')

    this.menu.close()
  }

  async deleteUserAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Please confirm your action',
      message: 'Are you sure you want to <strong>delete</strong> your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'Delete',
          cssClass: 'warning-button',
          handler: () => {
            this.loginService.logoutUser()
            this.toastService.presentToast('Deleted succesfully', 'success')
            this.router.navigateByUrl('/home')
            this.menu.close()
            this.loginService.deleteUser().subscribe((res) => {})
          },
        },
      ],
    })

    await alert.present()
  }

  async userSettings() {
    const modal = await this.modalController.create({
      component: UserSettingsModalPage,
      cssClass: 'my-custom-class',
      componentProps: {},
    })
    return await modal.present()
  }

  async openUserActions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      subHeader: this.userEmail,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          cssClass: 'warning-button',
          handler: () => {
            this.deleteUserAlert()
          },
        },
        {
          text: 'Settings',
          icon: 'settings-outline',
          handler: () => {
            this.userSettings()
          },
        },
        {
          text: 'Logout',
          icon: 'log-out-outline',
          handler: () => {
            this.logout()
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {},
        },
      ],
    })
    await actionSheet.present()

    const { role } = await actionSheet.onDidDismiss()
  }
}
