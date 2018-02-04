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

import { LearningAreaDialogComponent, LearningAreaCreateFormComponent } from './forms/learning-area-forms.component';
import { LearningGroupCreateFormComponent, LearningGroupDialogComponent } from './forms/learning-group-forms.component';
import { LearningBlockCreateFormComponent, LearningBlockDialogComponent } from './forms/learning-block-forms.component';
import { StudentDialogComponent, StudentCreateFormComponent } from './forms/student-forms.component';
import { StudentContextDialogComponent, StudentContextCreateFormComponent } from './forms/student-context-forms.component';


import { LearningMatrixDialogComponent, LearningMatrixCreateFormComponent } from './forms/learning-matrix-forms.component';
// tslint:disable-next-line:max-line-length
import { LearningMatrixVersionDialogComponent, LearningMatrixVersionCreateFormComponent } from './forms/learning-matrix-version-forms.component';
// tslint:disable-next-line:max-line-length
import { LearningMatrixHeaderCreateFormComponent, LearningMatrixHeaderDialogComponent } from './forms/learning-matrix-header-forms.component';
import { LearningMatrixCellCreateFormComponent, LearningMatrixCellDialogComponent } from './forms/learning-matrix-cell-forms.component';



import { LearningBlockItemComponent } from './learning-block-item/learning-block-item.component';
import { LearningMatrixItemComponent } from './learning-matrix-item/learning-matrix-item.component';
import { StudentLearningItemComponent } from './student-learning-item/student-learning-item.component';
import { StudentLearningGridComponent } from './student-learning-grid/student-learning-grid.component';


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
    // Dialog Lists

    // Forms
    // - Area
    LearningAreaDialogComponent, LearningAreaCreateFormComponent,
    // - Groups
    LearningGroupDialogComponent, LearningGroupCreateFormComponent,
    // - Blocks
    LearningBlockDialogComponent, LearningBlockCreateFormComponent,
    // - Student
    StudentDialogComponent, StudentCreateFormComponent,
    StudentContextDialogComponent, StudentContextCreateFormComponent,
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
    StudentLearningItemComponent,
    StudentLearningGridComponent
],
  exports: [LearningGroupListComponent],
  providers: [TeacherService],
  entryComponents: [
    LearningAreaDialogComponent,
    LearningGroupDialogComponent,
    LearningBlockDialogComponent,
    StudentDialogComponent,
    StudentContextDialogComponent,
    // Matrix
    LearningMatrixDialogComponent,
    LearningMatrixVersionDialogComponent,
    LearningMatrixHeaderDialogComponent,
    LearningMatrixCellDialogComponent,
    // Dialog Lists
   ]
})
export class TeacherModule {}
