import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherService } from './models/teacher.service';
import { MyMaterialModule } from './../global/my-material/my-material.module';
import { GlobalComponentsModule } from './../global/global-components/global-components.module';
import { TeacherRoutingModule } from './teacher-routing.module';
import { LearningGroupListComponent } from './learning-group-list/learning-group-list.component';
import { LearningAreaListComponent } from './learning-area-list/learning-area-list.component';
import { LearningLevelListComponent } from './learning-level-list/learning-level-list.component';
import { LearningTimeframeListComponent } from './learning-timeframe-list/learning-timeframe-list.component';

import { LearningAreaFormComponent,
         LearningAreaCreateFormComponent,
         LearningAreaEditFormComponent
         } from './forms/learning-area-forms.component';

import { LearningGroupFormComponent,
         LearningGroupCreateFormComponent,
         LearningGroupEditFormComponent
         } from './forms/learning-group-forms.component';

import { LearningLevelFormComponent,
         LearningLevelCreateFormComponent,
         LearningLevelEditFormComponent,
         } from './forms/learning-level-forms.component';

import { LearningTimeframeDialogComponent,
         LearningTimeframeFormComponent,
         LearningTimeframeCreateFormComponent,
          } from './forms/learning-timeframe-forms.component';

@NgModule({
  imports: [
    CommonModule,
    GlobalComponentsModule,
    AngularFireDatabaseModule,
    TeacherRoutingModule,
    ReactiveFormsModule,
    MyMaterialModule
  ],
  declarations: [
    // Lists
    LearningGroupListComponent,
    LearningAreaListComponent,
    LearningLevelListComponent,
    LearningTimeframeListComponent,
    // Forms
    LearningAreaFormComponent,
    LearningAreaCreateFormComponent,
    LearningAreaEditFormComponent,
    LearningGroupFormComponent,
    LearningGroupCreateFormComponent,
    LearningGroupEditFormComponent,
    LearningLevelFormComponent,
    LearningLevelCreateFormComponent,
    LearningLevelEditFormComponent,
    LearningTimeframeDialogComponent,
    LearningTimeframeFormComponent,
    LearningTimeframeCreateFormComponent
],
  exports: [LearningGroupListComponent],
  providers: [TeacherService],
  entryComponents: [
    LearningTimeframeDialogComponent
   ]
})
export class TeacherModule {}
