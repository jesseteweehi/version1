import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TeacherService } from './teacher.service';
import { MyMaterialModule } from './../global/my-material/my-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GlobalComponentsModule } from './../global/global-components/global-components.module';
import { TeacherRoutingModule } from './teacher-routing.module';

import { LearningGroupListComponent } from './learning-group-list/learning-group-list.component';
import { LearningAreaListComponent } from './learning-area-list/learning-area-list.component';
import { LearningBlockListComponent } from './learning-block-list/learning-block-list.component';
import { LearningMatrixListComponent } from './learning-matrix-list/learning-matrix-list.component';
import { StudentListComponent } from './student-list/student-list.component';
import { SchoolCourseListComponent } from './school-course-list/school-course-list.component';


import { MatrixDialogListComponent, MatrixSelectListComponent } from './dialogs-list/learning-matrix-dialog-list.component';

import { LearningAreaDialogComponent, LearningAreaCreateFormComponent } from './forms/learning-area-forms.component';
import { LearningGroupCreateFormComponent, LearningGroupDialogComponent } from './forms/learning-group-forms.component';
import { LearningBlockCreateFormComponent, LearningBlockDialogComponent } from './forms/learning-block-forms.component';
import { StudentDialogComponent, StudentCreateFormComponent } from './forms/student-forms.component';
import { SchoolCourseDialogComponent, SchoolCourseCreateFormComponent } from './forms/school-course-forms.component';

import { LearningMatrixDialogComponent, LearningMatrixCreateFormComponent } from './forms/learning-matrix-forms.component';
// tslint:disable-next-line:max-line-length
import { LearningMatrixVersionDialogComponent, LearningMatrixVersionCreateFormComponent } from './forms/learning-matrix-version-forms.component';
// tslint:disable-next-line:max-line-length
import { LearningMatrixHeaderCreateFormComponent, LearningMatrixHeaderDialogComponent } from './forms/learning-matrix-header-forms.component';
import { LearningMatrixCellCreateFormComponent, LearningMatrixCellDialogComponent } from './forms/learning-matrix-cell-forms.component';



import { LearningBlockItemComponent } from './learning-block-item/learning-block-item.component';
import { LearningMatrixItemComponent } from './learning-matrix-item/learning-matrix-item.component';


@NgModule({
  imports: [
    CommonModule,
    GlobalComponentsModule,
    AngularFireDatabaseModule,
    TeacherRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MyMaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    // Lists
    LearningGroupListComponent,
    LearningAreaListComponent,
    LearningBlockListComponent,
    LearningMatrixListComponent,
    SchoolCourseListComponent,
    // Dialog Lists
    MatrixDialogListComponent, MatrixSelectListComponent,

    // Forms
    // - Area
    LearningAreaDialogComponent, LearningAreaCreateFormComponent,
    // - Groups
    LearningGroupDialogComponent, LearningGroupCreateFormComponent,
    // - Blocks
    LearningBlockDialogComponent, LearningBlockCreateFormComponent,
    // - Student
    StudentDialogComponent, StudentCreateFormComponent,
    // - School Course
    SchoolCourseDialogComponent, SchoolCourseCreateFormComponent,
    // - Matrix
    LearningMatrixDialogComponent, LearningMatrixCreateFormComponent,
    // - Matrix Version
    LearningMatrixVersionDialogComponent, LearningMatrixVersionCreateFormComponent,
    // - Matrix Header
    LearningMatrixHeaderCreateFormComponent, LearningMatrixHeaderDialogComponent,
    // - Matrix Cell
    LearningMatrixCellCreateFormComponent, LearningMatrixCellDialogComponent,

    // Items
    LearningBlockItemComponent,
    LearningMatrixItemComponent,
    StudentListComponent,
    SchoolCourseListComponent
],
  exports: [LearningGroupListComponent],
  providers: [TeacherService],
  entryComponents: [
    LearningAreaDialogComponent,
    LearningGroupDialogComponent,
    LearningBlockDialogComponent,
    StudentDialogComponent,
    SchoolCourseDialogComponent,
    // Matrix
    LearningMatrixDialogComponent,
    LearningMatrixVersionDialogComponent,
    LearningMatrixHeaderDialogComponent,
    LearningMatrixCellDialogComponent,
    // Dialog Lists
    MatrixDialogListComponent
   ]
})
export class TeacherModule {}
