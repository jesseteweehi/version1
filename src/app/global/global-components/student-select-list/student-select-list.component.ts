import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { SelectData } from './../../models/interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from './../../models/classes';


@Component({
  selector: 'app-student-select-list',
  templateUrl: './student-select-list.component.html',
  styleUrls: ['./student-select-list.component.css']
})
export class StudentSelectListComponent implements OnInit {
  @Input() items: Observable<any[]>;
  @Output() studentsToSend = new EventEmitter();

  filtered: Observable<any[]>;

  selectedStudents: Student[];

  constructor() { }

  ngOnInit() {
    this.filtered = this.items;
  }

  save(list) {
    this.selectedStudents = list.selectedOptions.selected.map(item => item.value);
    this.studentsToSend.emit(this.selectedStudents);
  }

  search(s: string) {
    this.filtered = this.items
       .map(job => job.filter(j => j.lastName.toLowerCase().includes(s)));
  }

}
