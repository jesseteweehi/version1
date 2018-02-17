import { Component, OnInit } from '@angular/core';
import * as fuse from 'fuse.js';
import { TeacherService } from './teacher/teacher.service';
import { Student, UserProfile } from './global/models/classes';
import { AppService } from './app.service';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: UserProfile;
  constructor(private auth: AuthenticationService)  {}

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
  }
}
