import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  @Output() keySend = new EventEmitter();


  change(k: string, b: boolean) {
    this.keySend.emit({key: k, bool: b });
  }

  highlight(key) {
    if (this.attainedCells) {
      if (this.attainedCells.includes(key)) { return true;
      } else { return false; }
    } else {
      return false;
    }
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
