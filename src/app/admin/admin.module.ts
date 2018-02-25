import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminService } from './admin.service';
import { MyMaterialModule } from './../global/my-material/my-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GlobalComponentsModule } from './../global/global-components/global-components.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { EmailListComponent } from './email-list/email-list.component';
import { UserListComponent } from './user-list/user-list.component';

import { EmailCreateFormComponent, EmailDialogComponent } from './forms/email-forms.component';
import { UserCreateFormComponent, UserDialogComponent } from './forms/users-forms.component';

@NgModule({
  imports: [
    CommonModule,
    GlobalComponentsModule,
    AngularFireDatabaseModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MyMaterialModule,
    FlexLayoutModule

  ],
  declarations: [
    AdminComponent,
    UserListComponent,
    EmailListComponent,
    EmailCreateFormComponent,
    EmailDialogComponent,
    UserCreateFormComponent,
    UserDialogComponent
  ],
  providers: [AdminService],
  entryComponents: [EmailDialogComponent, UserDialogComponent]
})
export class AdminModule {}
