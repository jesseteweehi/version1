import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { LearningEvent } from '../../models/classes';
import { KeyedRead } from '@angular/compiler';


@Component({
  selector: 'app-grid-student-multi',
  templateUrl: './grid-student-multi.component.html',
  styleUrls: ['./grid-student-multi.component.css']
})
export class GridStudentMultiComponent {

  @Input() xHeaders: any[];
  @Input() yHeaders: any[];
  @Input() cells: any[];
  @Input() attainedCells: any[];
  @Input() eventCount: {};
  @Input() learningEvents: {};

  @Output() contextSend = new EventEmitter();
  @Output() eventSendLoad = new EventEmitter();

  edit = '';

  add(key) {
    this.edit = key;
  }

  loadEvents(key: string) {
    this.eventSendLoad.emit(key);
  }

  addContext(c: string, key: string) {
    const data = { context: c, cell: key };
    this.contextSend.emit(data);
    this.edit = '';
  }

  isEvent(key: string) {
    return this.eventCount.hasOwnProperty(key)
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
