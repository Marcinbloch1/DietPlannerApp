import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { ActionSheetController } from '@ionic/angular'
import { FileUploader } from 'ng2-file-upload'
import { User } from 'src/app/models/user'
import { Category } from 'src/app/models/category'
import { LoginService } from 'src/app/services/login/login.service'
import { environment } from 'src/environments/environment'
import {
  Camera,
  CameraOptions,
  CameraPlugin,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera'
import { Filesystem, Directory } from '@capacitor/filesystem'
import { Storage } from '@capacitor/storage'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MealService } from 'src/app/services/meal/meal.service'
import { ToastService } from 'src/app/services/toast/toast.service'
import { serialize } from 'object-to-formdata'
import { MealDto } from 'src/app/models/mealDto'
import { Observable } from 'rxjs'
import { CategoryService } from 'src/app/services/category/category.service'
import { PhotoService } from 'src/app/services/photo/photo.service'
import { Unit } from 'src/app/models/unit'
import { UnitService } from 'src/app/services/unit/unit.service'
import { Ingredient } from 'src/app/models/ingredient'
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service'
import { IonicSelectableComponent } from '@ionic-selectable/angular'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  @ViewChild('cameraFile') cameraFile: ElementRef
  @ViewChild('imageFile') imageFile: ElementRef

  user: User
  form: FormGroup = new FormGroup({})
  ingredients: FormArray

  private newMeal: MealDto
  // category: Category
  categories$: Observable<Category[]>
  units$: Observable<Unit[]>
  ingredientsList: Ingredient[] = []
  ingredients$: Observable<Ingredient[]>
  isIngredientsAvailable = false

  isPhoto = false

  constructor(
    private loginService: LoginService,
    private actionSheetController: ActionSheetController,
    private formBuilder: FormBuilder,
    private mealService: MealService,
    private toastService: ToastService,
    private categoryService: CategoryService,
    private photoService: PhotoService,
    private unitService: UnitService,
    private ingredientsService: IngredientsService
  ) {
    this.categories$ = this.categoryService.getCategories()
    this.units$ = this.unitService.getUnits()
    this.ingredients$ = this.ingredientsService.getIngredients()
    this.ingredientsService.getIngredients().subscribe((res) => {
      this.ingredientsList = res
    })
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      mealName: ['', Validators.required],
      description: ['', Validators.required],
      imagePath: [''],
      categoryName: ['', Validators.required],
      kcal: ['', Validators.required],
      proteins: ['', Validators.required],
      fat: ['', Validators.required],
      carbs: ['', Validators.required],
      ingredients: this.formBuilder.array([this.createItem()]),
      file: [],
    })
  }

  portChange(event: { component: IonicSelectableComponent; value: any }) {}

  getIngredients() {
    // this.ingredients$ = this.ingredientsService.getDayPlan()
  }

  getItems(ev: any) {
    // Reset items back to all of the items

    // set val to the value of the searchbar
    const val = ev.target.value

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isIngredientsAvailable = true
      this.ingredientsList = this.ingredientsList.filter((item) => {
        return item.ingredientName.toLowerCase().indexOf(val.toLowerCase()) > -1
      })
    } else {
      this.isIngredientsAvailable = false
    }
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      ingredientName: '',
      quantity: '',
      unitName: '',
    })
  }

  addItem(): void {
    this.ingredients = this.form.get('ingredients') as FormArray
    this.ingredients.push(this.createItem())
  }

  calculateKcal() {
    this.form
      .get('kcal')
      .patchValue(
        this.form.get('proteins').value * 4 +
          this.form.get('carbs').value * 4 +
          this.form.get('fat').value * 7
      )
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.form.get('file').setValue(file)
      this.isPhoto = true
    }
  }

  async takePhoto() {
    //   const options: CameraOptions = {
    //     quality: 70,
    //     destinationType: this.camera.DestinationType.FILE_URI,
    //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //     saveToPhotoAlbum:false,
    //     targetWidth: 400,
    //     targetHeight: 400
    // }

    // this.camera.getPicture(options).then((imageData) => {
    //   this.getSystemURL(imageData);
    // }, (err) => {

    // });
    // this.photoService.addNewToGallery()
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100,
    })
    const savedImageFile = await this.savePicture(capturedPhoto)
    this.form.get('file').setValue(savedImageFile)
  }

  async showPhotoOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Image',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Take a photo',
          icon: 'camera',
          handler: () => {
            this.cameraFile.nativeElement.click()
          },
        },
        {
          text: 'Load from library',
          icon: 'image',
          handler: () => {
            this.imageFile.nativeElement.click()
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
  }

  private async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo)

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg'
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    })

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: savedFile,
      webviewPath: photo.webPath,
    }
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!)
    const blob = await response.blob()

    return (await this.convertBlobToBase64(blob)) as string
  }

  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onerror = reject
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.readAsDataURL(blob)
    })

  onSubmit() {
    const formData = new FormData()

    Object.keys(this.form.controls).forEach((key) => {
      if (key === 'ingredients') {
        let serializedIngredients = JSON.stringify(
          this.form.get(`${key}`).value
        )
        formData.append(`${key}`, serializedIngredients)
      } else {
        formData.append(`${key}`, this.form.get(`${key}`).value)
      }
    })
    const options = {
      indices: true,
      allowEmptyArrays: true,
    }

    for (var key of formData.entries()) {
    }
    this.mealService.addMeal(formData).subscribe(() => {
      this.toastService.presentToast('Meal added successfully', 'success')
      this.form.reset(this.form.value)
    })
  }
}
