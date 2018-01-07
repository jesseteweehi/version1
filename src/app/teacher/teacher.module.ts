import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherService } from './teacher.service';
import { MyMaterialModule } from './../global/my-material/my-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GlobalComponentsModule } from './../global/global-components/global-components.module';
import { TeacherRoutingModule } from './teacher-routing.module';

import { LearningGroupListComponent } from './learning-group-list/learning-group-list.component';
import { LearningAreaListComponent } from './learning-area-list/learning-area-list.component';
import { LearningBlockListComponent } from './learning-block-list/learning-block-list.component';
import { LearningMatrixListComponent } from './learning-matrix-list/learning-matrix-list.component';
import { LearningMatrixVersionListComponent } from './learning-matrix-version-list/learning-matrix-version-list.component';


import { LearningAreaDialogComponent, LearningAreaCreateFormComponent } from './forms/learning-area-forms.component';
import { LearningGroupCreateFormComponent, LearningGroupDialogComponent } from './forms/learning-group-forms.component';
import { LearningBlockCreateFormComponent, LearningBlockDialogComponent } from './forms/learning-block-forms.component';
import { LearningMatrixItemCreateFormComponent, LearningMatrixItemDialogComponent } from './forms/learning-matrix-item-forms.component';
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
    MyMaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    // Lists
    LearningGroupListComponent,
    LearningAreaListComponent,
    LearningBlockListComponent,
    LearningMatrixListComponent,
    LearningMatrixVersionListComponent,

    // Forms
    // - Area
    LearningAreaDialogComponent, LearningAreaCreateFormComponent,
    // - Groups
    LearningGroupDialogComponent, LearningGroupCreateFormComponent,
    // - Blocks
    LearningBlockDialogComponent, LearningBlockCreateFormComponent,
    // - Matix
    LearningMatrixDialogComponent, LearningMatrixCreateFormComponent,
    // - Matrix Version
    LearningMatrixVersionDialogComponent, LearningMatrixVersionCreateFormComponent,
    // - Matrix Item
    LearningMatrixItemCreateFormComponent, LearningMatrixItemDialogComponent,
    // - Matrix Header
    LearningMatrixHeaderCreateFormComponent, LearningMatrixHeaderDialogComponent,
    // - Matrix Cell
    LearningMatrixCellCreateFormComponent, LearningMatrixCellDialogComponent,

    // Items
    LearningBlockItemComponent,
    LearningMatrixItemComponent,
],
  exports: [LearningGroupListComponent],
  providers: [TeacherService],
  entryComponents: [
    LearningAreaDialogComponent,
    LearningGroupDialogComponent,
    LearningBlockDialogComponent,
    LearningMatrixDialogComponent,
    LearningMatrixVersionDialogComponent,
    LearningMatrixItemDialogComponent,
    LearningMatrixHeaderDialogComponent,
    LearningMatrixCellDialogComponent
   ]
})
export class TeacherModule {}
