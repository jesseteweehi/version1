import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from './global/my-material/my-material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StudentFuseSearchComponent } from './search-student-fuse';
import { AppService } from './app.service';
import { AuthenticationService } from './authentication.service';



@NgModule({
  declarations: [
    AppComponent,
    StudentFuseSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MyMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [AppService, AuthenticationService],
  bootstrap: [AppComponent],
  entryComponents: [StudentFuseSearchComponent]
})
export class AppModule { }
