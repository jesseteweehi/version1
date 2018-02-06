import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  @Input() xHeaders: any[];
  @Input() yHeaders: any[];
  @Input() cells: any[];
  @Input() canEdit: Boolean = true;

  @Output() editSend = new EventEmitter();
  @Output() deleteSend = new EventEmitter();


  edit(l: string, chosenitem, i) {
    this.editSend.emit({list: l, item: chosenitem, index: i });
  }

  delete(l: string, i) {
    this.deleteSend.emit({list: l, index: i});
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
