import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearningTimeframeListComponent } from './learning-timeframe-list/learning-timeframe-list.component';
import { LearningGroupListComponent } from './learning-group-list/learning-group-list.component';
import { LearningLevelListComponent } from './learning-level-list/learning-level-list.component';
import { LearningAreaListComponent } from './learning-area-list/learning-area-list.component';


const teacherRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'timeframelist' },
    { path: 'timeframelist', component: LearningTimeframeListComponent },
    { path: 'arealist', component: LearningAreaListComponent },
    { path: 'levellist', component: LearningLevelListComponent },
    { path: 'grouplist', component: LearningGroupListComponent },
];


@NgModule({
  imports: [RouterModule.forChild(teacherRoutes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
