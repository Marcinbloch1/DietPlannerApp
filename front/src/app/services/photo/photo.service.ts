import { Injectable } from '@angular/core'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { File, FileEntry } from '@ionic-native/file'

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  file: any
  myphoto: Blob
  constructor() {}

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100,
    }).then(
      (imageData) => {
        this.getSystemURL(imageData)
      },
      (err) => {}
    )
  }

  private getSystemURL(imageFileUri: any): void {
    this.file
      .resolveLocalFilesystemUrl(imageFileUri)
      .then((entry) =>
        (entry as FileEntry).file((file) => {
          this.readFile(file)
        })
      )
      .catch((err) => console.log(err))
  }

  private readFile(file: any) {
    const reader = new FileReader()
    reader.onloadend = () => {
      this.myphoto = new Blob([reader.result], { type: file.type })
      var headers = new Headers()
      headers.append(
        'Content-Type',
        'multipart/form-data;boundary=' + Math.random()
      )
      headers.append('Accept', 'application/json')
      // let options = new RequestOptions({
      //     headers: headers
      // });
      let formData = new FormData()
      formData.append('photo', this.myphoto, '123.jpg')
      // this.http.post('http://localhost/upload.php', formData, options)
      //     .map(...)
      //     .subscribe(...);
      //     };
      reader.readAsArrayBuffer(file)
    }
  }
}
