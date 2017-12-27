import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { DumbCardComponent } from './dumb/dumb.component';
import { MyMaterialModule } from './../my-material/my-material.module';



@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    RouterModule
  ],
  declarations: [DumbCardComponent],
  exports: [DumbCardComponent]
})
export class GlobalComponentsModule { }