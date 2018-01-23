import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MyMaterialModule } from './../my-material/my-material.module';



@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    RouterModule
  ],
  declarations: [
],
  exports: []
})
export class GlobalComponentsModule { }