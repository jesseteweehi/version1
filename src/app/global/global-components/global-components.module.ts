import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DumbCardComponent } from './dumb/dumb.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DumbCardComponent],
  exports: [DumbCardComponent]
})
export class GlobalComponentsModule { }