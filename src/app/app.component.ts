import { Component } from '@angular/core';
import * as fuse from 'fuse.js';
import { TeacherService } from './teacher/teacher.service';
import { Student } from './global/models/classes';
import { AppService } from './app.service';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthenticationService) {}

}
