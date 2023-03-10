import { IonicModule } from '@ionic/angular'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Tab3Page } from './tab3.page'

import { Tab3PageRoutingModule } from './tab3-routing.module'
import { FileUploadModule } from 'ng2-file-upload'
import { IonicSelectableModule } from '@ionic-selectable/angular';
import { NgSelectModule } from '@ng-select/ng-select'
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    FileUploadModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    NgSelectModule,
    NgOptionHighlightModule,
  ],
  declarations: [Tab3Page],
})
export class Tab3PageModule {}
