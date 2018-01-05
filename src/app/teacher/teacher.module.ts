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

import { LearningAreaDialogComponent, LearningAreaCreateFormComponent } from './forms/learning-area-forms.component';
import { LearningGroupCreateFormComponent, LearningGroupDialogComponent } from './forms/learning-group-forms.component';
import { LearningBlockCreateFormComponent, LearningBlockDialogComponent } from './forms/learning-block-forms.component';
import { LearningMatrixCreateFormComponent, LearningMatrixDialogComponent } from './forms/learning-matrix-forms.component';

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
    LearningGroupListComponent, LearningAreaListComponent, LearningBlockListComponent, LearningMatrixListComponent,

    // Forms
    // - Area
    LearningAreaDialogComponent, LearningAreaCreateFormComponent,
    // - Groups
    LearningGroupDialogComponent, LearningGroupCreateFormComponent,
    // - Blocks
    LearningBlockDialogComponent, LearningBlockCreateFormComponent,
    // - Matrix
    LearningMatrixCreateFormComponent, LearningMatrixDialogComponent,

    // Items
    LearningBlockItemComponent,
    LearningMatrixItemComponent
],
  exports: [LearningGroupListComponent],
  providers: [TeacherService],
  entryComponents: [
    LearningAreaDialogComponent,
    LearningGroupDialogComponent,
    LearningBlockDialogComponent,
   ]
})
export class TeacherModule {}
