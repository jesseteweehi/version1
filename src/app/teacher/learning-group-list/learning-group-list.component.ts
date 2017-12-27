import { TeacherService } from './../models/teacher.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LearningGroup } from '../../global/models/classes';

@Component({
  selector: 'app-learning-group-list',
  templateUrl: './learning-group-list.component.html',
  styleUrls: ['./learning-group-list.component.css']
})
export class LearningGroupListComponent implements OnInit {
  items: Observable<LearningGroup[]>;

  menuDetails = {
    'edit' : 'Edit', 'delete': 'Delete', 'lock': 'Lock'
  };

  constructor(private ts: TeacherService) { }

  ngOnInit() {
    this.items = this.ts.findList('learningExperienceGroup').map(value => {
      return value.map(c => (LearningGroup.fromJson(c.payload.key, {...c.payload.val()})));
    });
  }
}
