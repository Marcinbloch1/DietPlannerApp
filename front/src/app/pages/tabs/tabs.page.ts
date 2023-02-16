import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MacroService } from 'src/app/services/macro/macro.service'
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(
    private sharedService: SharedDataService,
    private macroService: MacroService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.macroService.getMacro().subscribe((res) => {})
    this.sharedService.emitChange(true)
  }

  ionViewWillLeave() {}
}
