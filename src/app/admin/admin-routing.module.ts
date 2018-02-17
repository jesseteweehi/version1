import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { EmailListComponent } from './email-list/email-list.component';

const adminRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'user-list' },
    { path: 'user-list', component: UserListComponent },
    { path: 'email-list', component: EmailListComponent },
];


@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
