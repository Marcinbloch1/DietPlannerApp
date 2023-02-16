import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Observable, ReplaySubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { Macro } from 'src/app/models/macro'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class MacroService {
  private macroUrl = environment.apiUrl + '/Macro'

  private currentMacroSource = new ReplaySubject<Macro>(1)
  currentMacro$ = this.currentMacroSource.asObservable()

  constructor(private http: HttpClient) {}

  // getMeals(): Observable<any> {
  //   return this.http.get(this.macroUrl)
  // }

  getMacro(): Observable<any> {
    return this.http.get(this.macroUrl).pipe(
      map((res: Macro) => {
        const macro = res
        if (macro) {
          localStorage.setItem('macro', JSON.stringify(macro))
          this.currentMacroSource.next(macro)
        }
        return macro
      })
    )
  }

  updateUserMacro(userMacro: Macro) {
    return this.http.put(this.macroUrl, userMacro)
  }

  removeCurrentMacro() {
    this.currentMacroSource.next(null)
  }
}
