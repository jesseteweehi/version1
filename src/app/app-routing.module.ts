import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'teacher' },
    { path: 'teacher', loadChildren: 'app/teacher/teacher.module#TeacherModule', runGuardsAndResolvers: 'always' },
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', runGuardsAndResolvers: 'always' },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
