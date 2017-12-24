import { GlobalComponentsModule } from './../global/global-components/global-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from 'angularfire2/database';


@NgModule({
  imports: [
    CommonModule,
    GlobalComponentsModule,
    AngularFireDatabaseModule
  ],
  declarations: []
})
export class TeacherModule { }