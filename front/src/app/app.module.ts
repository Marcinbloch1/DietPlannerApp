import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { JwtInterceptorService } from './services/jwtInterceptor/jwt-interceptor.service'
import { IonicStorageModule } from '@ionic/storage-angular'
import { SidemenuComponent } from './pages/sidemenu/sidemenu.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ErrorInterceptor } from './_interceptors/error.interceptor'
import { TestErrorsComponent } from './errors/test-errors/test-errors.component'
import { NotFoundComponent } from './errors/not-found/not-found.component'
import { ServerErrorComponent } from './errors/server-error/server-error.component'
import { JwtInterceptor } from './_interceptors/jwt.interceptor'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxSpinnerModule } from 'ngx-spinner'
import { LoadingInterceptor } from './_interceptors/loading.interceptor'
import { SidemenuContentComponent } from './pages/sidemenu-content/sidemenu-content.component'
import { NgSelectModule } from '@ng-select/ng-select'
import { IonicSelectableModule } from '@ionic-selectable/angular'
import { Tab3Page } from './pages/tab3/tab3.page'

@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    SidemenuContentComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgSelectModule,
    IonicSelectableModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptorService, ErrorInterceptor,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
