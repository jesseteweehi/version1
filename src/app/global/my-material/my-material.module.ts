import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule,
         MatButton,
         MatButtonModule,
         MatToolbarModule,
         MatInputModule,
         MatAutocompleteModule,
         MatDialogModule,
         MatCardModule,
         MatSnackBarModule,
         MatTooltipModule,
         MatIconModule,
         MatListModule,
         MatSelectModule,
         MatSidenavModule,
         MatChipsModule,
         MatTabsModule,
         MatTableModule,
         MatRadioModule,
         MatExpansionModule,
         MatDatepickerModule,
         MatNativeDateModule,
         MatStepperModule,
         MatCheckboxModule
         } from '@angular/material';

import {MatMomentDateModule} from '@angular/material-moment-adapter'
import 'hammerjs';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatChipsModule,
    MatTabsModule,
    MatTableModule,
    MatRadioModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatCheckboxModule
],
  exports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatChipsModule,
    MatTabsModule,
    MatTableModule,
    MatRadioModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatCheckboxModule
  ],
})
export class MyMaterialModule { }