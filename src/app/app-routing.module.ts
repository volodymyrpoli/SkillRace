import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { UserContainerComponent } from './components/pages/user-container/user-container.component';
import { AdminContainerComponent } from './components/pages/admin-container/admin-container.component';
import { DashboardComponent } from './components/pages/user-container/dashboard/dashboard.component';
import { GridComponent } from './components/pages/user-container/grid/grid.component';
import { BoardEditorComponent } from './components/pages/admin-container/board-editor/board-editor.component';
import { AdminDashboardComponent } from './components/pages/admin-container/admin-dashboard/admin-dashboard.component';
import { SettingsComponent } from './components/pages/admin-container/settings/settings.component';
import { UserResultsComponent } from './components/pages/admin-container/user-results/user-results.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'work', pathMatch: 'full' },
  {
    path: 'work',
    component: UserContainerComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'grid/:id', component: GridComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminContainerComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', redirectTo: 'editor', pathMatch: 'full' },
      { path: 'editor', component: BoardEditorComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'users', component: UserResultsComponent },
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
