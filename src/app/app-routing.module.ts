import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { UserContainerComponent } from './components/pages/user-container/user-container.component';
import { AdminContainerComponent } from './components/pages/admin-container/admin-container.component';

const routes: Routes = [
  { path: '', redirectTo: 'work', pathMatch: 'full' },
  {
    path: 'work',
    component: UserContainerComponent,
    children: []
  },
  {
    path: 'admin',
    component: AdminContainerComponent,
    children: []
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
