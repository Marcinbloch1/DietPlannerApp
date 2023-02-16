import { animate, style, transition, trigger } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { take } from 'rxjs/operators'
import { Macro } from 'src/app/models/macro'
import { MacroService } from 'src/app/services/macro/macro.service'
import { ToastService } from 'src/app/services/toast/toast.service'

@Component({
  selector: 'app-sidemenu-content',
  templateUrl: './sidemenu-content.component.html',
  styleUrls: ['./sidemenu-content.component.scss'],
})
export class SidemenuContentComponent implements OnInit {
  isEditMacroChecked: boolean = false
  kcalValue: number = 2000
  proteinsValue: number = 100
  fatValue: number = 100
  carbsValue: number = 200

  userMacro: Macro

  constructor(
    public macroService: MacroService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  onToggleEditMacro(event) {
    if (event.detail.checked) {
      this.isEditMacroChecked = true
    } else {
      this.isEditMacroChecked = false

      this.macroService.currentMacro$.pipe(take(1)).subscribe((macro) => {
        this.userMacro = macro
        this.userMacro.kcal =
          this.userMacro.proteins * 4 +
          this.userMacro.fat * 7 +
          this.userMacro.carbs * 4

        this.macroService.updateUserMacro(this.userMacro).subscribe((res) => {
          this.toastService.presentToast('User macro updated', 'success')
        })
      })
    }
  }
}
