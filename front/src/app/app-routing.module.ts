import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from './errors/not-found/not-found.component'
import { ServerErrorComponent } from './errors/server-error/server-error.component'
import { TestErrorsComponent } from './errors/test-errors/test-errors.component'
import { AuthGuard } from './guards/auth.guard'
import { LoggedInAuthGuard } from './guards/logged-in-auth.guard'
import { HomePage } from './pages/home/home.page'
import { Tab1Page } from './pages/tab1/tab1.page'
import { TabsPage } from './pages/tabs/tabs.page'

const routes: Routes = [
  { path: '', redirectTo: '/tabs/tab1', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    // canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    // canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
    // canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'user-settings-modal',
    loadChildren: () =>
      import('./pages/user-settings-modal/user-settings-modal.module').then(
        (m) => m.UserSettingsModalPageModule
      ),
  },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
