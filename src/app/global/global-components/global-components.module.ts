import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MyMaterialModule } from './../my-material/my-material.module';
import { GridComponent } from './grid/grid.component';
import { StudentSelectListComponent } from './student-select-list/student-select-list.component';
import { StudentDialogListAddComponent, StudentDialogListRemoveComponent, 
  StudentDialogListRemoveEnrolledComponent } from './student-dialog-list/student-dialog-list.component';
import { GridKeyComponent } from './grid-key/grid-key.component';
import { GridStudentComponent } from './grid-student/grid-student.component';
import { GridStudentMultiComponent } from './grid-student-multi/grid-student-multi.component';





@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    RouterModule
  ],
  declarations: [
    GridComponent,
    StudentSelectListComponent,
    StudentDialogListAddComponent, StudentDialogListRemoveComponent, StudentDialogListRemoveEnrolledComponent,
    GridKeyComponent,
    GridStudentComponent,
    GridStudentMultiComponent
],
  entryComponents: [StudentDialogListAddComponent, StudentDialogListRemoveComponent, StudentDialogListRemoveEnrolledComponent],
  exports: [GridComponent, GridKeyComponent, StudentSelectListComponent, GridStudentComponent, GridStudentMultiComponent,
    StudentDialogListAddComponent, StudentDialogListRemoveComponent, StudentDialogListRemoveEnrolledComponent]
})
export class GlobalComponentsModule {}
