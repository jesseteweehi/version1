import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearningGroupListComponent } from './learning-group-list/learning-group-list.component';
import { LearningAreaListComponent } from './learning-area-list/learning-area-list.component';
import { LearningBlockListComponent } from './learning-block-list/learning-block-list.component';
import { LearningBlockItemComponent } from './learning-block-item/learning-block-item.component';
import { LearningMatrixListComponent } from './learning-matrix-list/learning-matrix-list.component';
import { LearningMatrixItemComponent } from './learning-matrix-item/learning-matrix-item.component';
import { LearningMatrixVersionListComponent } from './learning-matrix-version-list/learning-matrix-version-list.component';


const teacherRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'matrixlist' },
    { path: 'arealist', component: LearningAreaListComponent },
    { path: 'grouplist',
      children: [
        { path: '', component: LearningGroupListComponent},
        { path: ':groupid', component: LearningBlockListComponent}
      ]
    },
    { path: 'block',
      children: [
        { path: ':blockid', component: LearningBlockItemComponent}
      ]
    },
    { path: 'matrixlist',
      children: [
        { path: '', component: LearningMatrixListComponent},
      ]
    },
    { path: 'matrix',
    children: [
      { path: ':matrixid', component: LearningMatrixItemComponent}
    ]
    },
];


@NgModule({
  imports: [RouterModule.forChild(teacherRoutes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
