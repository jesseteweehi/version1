import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid-key',
  templateUrl: './grid-key.component.html',
  styleUrls: ['./grid-key.component.css']
})
export class GridKeyComponent {
  @Input() xHeaders: any[];
  @Input() yHeaders: any[];
  @Input() cells: any[];
  @Input() canLock: Boolean = false;
  @Input() actions: Boolean = false;

  @Output() addStudentsSend = new EventEmitter();
  @Output() seeStudentsSend = new EventEmitter();

  addStudents(key: string) {
    this.addStudentsSend.emit(key);
  }

  seeStudents(key: string) {
    this.seeStudentsSend.emit(key);
  }

  template() {
    if (this.xHeaders) {
      if (this.xHeaders.length > 1) {
        return { 'grid-template-columns' : 'repeat(' + (this.xHeaders.length + 1) + ', 1fr)' };
      } else {
        return { 'grid-template-columns' : '25% 75%' };
      }
    }
  }

  xheader(i) {
    return {
      'grid-column': + (i + 1) + '/' + (i + 2),
      'grid-row': '1 / 2',
    };
  }

  yheader(i) {
    return {
      'grid-row': + (i + 1) + '/' + (i + 2),
      'grid-column': '1 / 2',
    };
  }

}

