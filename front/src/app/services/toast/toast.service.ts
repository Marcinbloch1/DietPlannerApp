import { Injectable } from '@angular/core'
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular'

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  loading: any

  constructor(
    private toastController: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    })
    toast.present()
  }

  async errorLoading(message: any) {
    const loading = await this.alertCtrl.create({
      header: 'Error',
      message: message,
      buttons: [
        {
          text: 'ok',
          handler: () => {},
        },
      ],
    })
    await loading.present()
  }

  async showalert() {
    var load = await this.loadingCtrl.create({
      message: 'Please wait....',
    })
    load.present()
  }

  loadingDismiss() {
    this.loading.dismiss()
  }
}
