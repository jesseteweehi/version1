import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MyMaterialModule } from './../my-material/my-material.module';
import { GridComponent } from './grid/grid.component';




@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    RouterModule
  ],
  declarations: [
    GridComponent
],
  exports: [GridComponent]
})
export class GlobalComponentsModule { }