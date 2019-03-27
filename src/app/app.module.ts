import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './components/shared/card/card.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatSelectModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { KanbanGridComponent } from './components/shared/kanban-grid/kanban-grid.component';
import { KanbanRowComponent } from './components/shared/kanban-grid/kanban-row/kanban-row.component';
import { KanbanCellComponent } from './components/shared/kanban-grid/kanban-cell/kanban-cell.component';
import { KanbanFixedCellComponent } from './components/shared/kanban-grid/kanban-fixed-cell/kanban-fixed-cell.component';
import { KanbanHeaderCellComponent } from './components/shared/kanban-grid/kanban-header-cell/kanban-header-cell.component';
import { SortByPipe } from './pipes/sort-by.pipe';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/pages/login/login.component';
import { UserContainerComponent } from './components/pages/user-container/user-container.component';
import { AdminContainerComponent } from './components/pages/admin-container/admin-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/pages/user-container/dashboard/dashboard.component';
import { GridComponent } from './components/pages/user-container/grid/grid.component';
import { GridEditorComponent } from './components/pages/admin-container/board-editor/grid-editor/grid-editor.component';
import { GridEditorColumnComponent } from './components/pages/admin-container/board-editor/grid-editor/grid-editor-column/grid-editor-column.component';
import { GridEditorCellComponent } from './components/pages/admin-container/board-editor/grid-editor/grid-editor-cell/grid-editor-cell.component';
import { GridEditorBadgeComponent } from './components/pages/admin-container/board-editor/grid-editor/grid-editor-badge/grid-editor-badge.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GridEditorFormComponent } from './components/pages/admin-container/board-editor/grid-editor/grid-editor-form/grid-editor-form.component';
import { BoardEditorComponent } from './components/pages/admin-container/board-editor/board-editor.component';
import { AdminDashboardComponent } from './components/pages/admin-container/admin-dashboard/admin-dashboard.component';
import { UserResultsComponent } from './components/pages/admin-container/user-results/user-results.component';
import { SettingsComponent } from './components/pages/admin-container/settings/settings.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    KanbanGridComponent,
    KanbanRowComponent,
    KanbanCellComponent,
    KanbanFixedCellComponent,
    KanbanHeaderCellComponent,
    SortByPipe,
    LoginComponent,
    UserContainerComponent,
    AdminContainerComponent,
    DashboardComponent,
    GridComponent,
    GridEditorComponent,
    GridEditorColumnComponent,
    GridEditorCellComponent,
    GridEditorBadgeComponent,
    GridEditorFormComponent,
    BoardEditorComponent,
    AdminDashboardComponent,
    UserResultsComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatListModule,
    MatSelectModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
