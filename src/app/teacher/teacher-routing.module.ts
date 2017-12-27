import { LearningAreaListComponent } from './learning-area-list/learning-area-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearningTimeframeListComponent } from './learning-timeframe-list/learning-timeframe-list.component';
import { LearningGroupListComponent } from './learning-group-list/learning-group-list.component';
import { LearningLevelListComponent } from './learning-level-list/learning-level-list.component';


const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'path' },
    { path: 'timeframelist', component: LearningTimeframeListComponent },
    { path: 'arealist', component: LearningAreaListComponent },
    { path: 'levellist', component: LearningLevelListComponent },
    { path: 'grouplist', component: LearningGroupListComponent },
];


@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
