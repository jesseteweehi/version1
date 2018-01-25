import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MyMaterialModule } from './../my-material/my-material.module';
import { GridComponent } from './grid/grid.component';
import { StudentSelectListComponent } from './student-select-list/student-select-list.component';
import { StudentDialogListComponent } from './student-dialog-list/student-dialog-list.component';





@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    RouterModule
  ],
  declarations: [
    GridComponent,
    StudentSelectListComponent,
    StudentDialogListComponent
],
  entryComponents[StudentDialogListComponent],
  exports: [GridComponent, StudentSelectListComponent, StudentDialogListComponent]
})
export class GlobalComponentsModule {}
