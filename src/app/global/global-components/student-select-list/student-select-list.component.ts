import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Student } from './../../models/classes';


@Component({
  selector: 'app-student-select-list',
  templateUrl: './student-select-list.component.html',
  styleUrls: ['./student-select-list.component.css']
})
export class StudentSelectListComponent implements OnChanges {
  @Input() items: any[];
  @Output() studentsToSend = new EventEmitter();

  filtered: any[];

  selectedStudents: any[];

  constructor() { }

  ngOnChanges() {
    this.filtered = this.items;
  }

  save(list) {
    this.selectedStudents = list.selectedOptions.selected.map(item => item.value);
    this.studentsToSend.emit(this.selectedStudents);
  }

  search(s: string) {
    this.filtered = this.items
       .filter(j => j.lastName.toLowerCase().includes(s));
  }

}
