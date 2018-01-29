import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearningGroupListComponent } from './learning-group-list/learning-group-list.component';
import { LearningAreaListComponent } from './learning-area-list/learning-area-list.component';
import { LearningBlockListComponent } from './learning-block-list/learning-block-list.component';
import { LearningBlockItemComponent } from './learning-block-item/learning-block-item.component';
import { LearningMatrixListComponent } from './learning-matrix-list/learning-matrix-list.component';
import { LearningMatrixItemComponent } from './learning-matrix-item/learning-matrix-item.component';
import { StudentListComponent } from './student-list/student-list.component';
import { SchoolCourseListComponent } from './school-course-list/school-course-list.component';
import { StudentLearningItemComponent } from './student-learning-item/student-learning-item.component';
import { StudentLearningGridComponent } from './student-learning-grid/student-learning-grid.component';


const teacherRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'student-list' },
    { path: 'area-list', component: LearningAreaListComponent },
    { path: 'student-list', children : [
      { path: '', component: StudentListComponent },
      { path: ':studentid', children: [
        { path: '', component: StudentLearningItemComponent },
        { path: 'learning', children: [
          { path: ':groupId/:blockid', component: StudentLearningGridComponent },
        ] }
        ]},
      ]
    },
    { path: 'school-course', component: SchoolCourseListComponent },
    { path: 'group-list',
      children: [
        { path: '', component: LearningGroupListComponent},
        { path: ':groupid', children: [
           { path: '', component: LearningBlockListComponent },
           { path: ':blockid', component: LearningBlockItemComponent }
        ]},
      ]
    },
    { path: 'matrix-list',
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
