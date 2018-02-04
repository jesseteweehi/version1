import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Header, Cell, Student, LearningBlock, LearningEvent, StudentContext } from './../../global/models/classes';
import { StudentContextDialogComponent } from '../forms/student-context-forms.component';
import { TeacherService } from '../teacher.service';


import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/subject';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-student-learning-grid',
  templateUrl: './student-learning-grid.component.html',
  styleUrls: ['./student-learning-grid.component.css']
})
export class StudentLearningGridComponent implements OnInit, OnDestroy {
  DialogRef: MatDialogRef<StudentContextDialogComponent>;

  private ngUnsubscribe: Subject<any> = new Subject();

  groupId: string;
  blockId: string;
  studentId: string;
  multiId: boolean;
  block: LearningBlock;
  student: Observable<Student>;
  context: Observable<StudentContext>;
  eventCount: object = {};

  xHeadersList: any[];
  yHeadersList: any[];
  cellsList: any[];
  attainedCells: string[];
  learningEvents: object = {};

  constructor(private ts: TeacherService,
              private route: ActivatedRoute,
              private location: Location,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.blockId = this.route.snapshot.params['blockid'];
    this.groupId = this.route.snapshot.params['groupid'];
    this.studentId = this.route.snapshot.params['studentid'];

    if (this.route.snapshot.params['multiid'] === 'true') { this.multiId = true;
    } else { this.multiId = false; }

    this.student = this.ts.findObjectPath(`studentProfile/${this.studentId}`)
      .map(item => Student.fromJson(item.key, {...item.payload.val()}));

    this.context = this.ts.findObjectPath(`studentContext/${this.studentId}/${this.blockId}`)
      .map(item => StudentContext.fromJson(item.key, {...item.payload.val()}));

    console.log(this.context)

    // Event

    // Block
    const block = this.ts.findObjectPath(`learningBlock/${this.blockId}`)
      .takeUntil(this.ngUnsubscribe)
      .map(c => LearningBlock.fromJson(c.key, {...c.payload.val()}));

    const xHeader = this.ts.findList(`header/${this.blockId}/xheader`)
      .takeUntil(this.ngUnsubscribe)
      .map(changes => changes.map((c => Header.fromJson(c.key, {...c.payload.val()}))));

    const yHeader = this.ts.findList(`header/${this.blockId}/yheader`)
      .takeUntil(this.ngUnsubscribe)
      .map(changes => changes.map((c => Header.fromJson(c.key, {...c.payload.val()}))));

    const cells = this.ts.findItemForObjectList('learningCellForBlock', 'learningCell', this.blockId)
      .takeUntil(this.ngUnsubscribe)
      .map(changes => changes.map(c => Cell.fromJson(c.key, {...c.payload.val()})));

    const attainedCells = this.ts.findObjectPath(`studentLearning/${this.studentId}/cells`)
      .takeUntil(this.ngUnsubscribe)
      .map(changes =>  {
        if (changes.key) {
          return Object.keys(changes.payload.val());
        } else {
          return [];
        }
      });

    Observable.combineLatest(xHeader, yHeader, cells, attainedCells, block).subscribe(result => {
      this.xHeadersList = result[0];
      this.yHeadersList = result[1];
      this.cellsList = result[2];
      this.attainedCells = result[3];
      this.block = result[4];
                   });

    const eventcount = this.ts.findObjectPath(`eventByStudentCellKeyForBlock/${this.studentId}/${this.blockId}`)
        .takeUntil(this.ngUnsubscribe)
        .map(changes =>  {
          if (changes.key) {
            return changes.payload.val();
          } else {
            return [];
          }
        });

    eventcount.subscribe(result => {
      Object.entries(result).forEach(
        ([key, value]) =>  this.eventCount[key] = Object.keys(value).length);
      });


    const events = this.ts.findItemForObjectList('learningCellForBlock', 'learningCell', this.blockId)
      .takeUntil(this.ngUnsubscribe)
      .map(changes => changes.map(c => c.key))
      .map(array => array.map(key => this.ts.findList(`eventByStudentInCell/${this.studentId}/${key}`)))
      .flatMap(result => Observable.combineLatest(result));

    events.subscribe(result => {
        const a = [].concat.apply([], result);
        const eventsArray = a.map(each => LearningEvent.fromJson(each.key, {...each.payload.val()}));
        eventsArray.forEach(each => {
          this.learningEvents[each.cell] = [];
        });
        eventsArray.forEach(element => {
          this.learningEvents[element.cell].push(element);
        });
      });
  }

  add(item?: StudentContext) {
    this.DialogRef = this.dialog.open(StudentContextDialogComponent, {
      data: {
        currentFormValues: item
      }
    });
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        if (x.edit) {
        this.messagefromPromise(this.ts.changeObject(`/studentContext/${this.studentId}/${this.blockId}/${item.key}`, x.data.value));
        } else {
        this.messagefromPromise(this.ts.createStudentContext(x.data.value, this.studentId, this.blockId), 'Context Added');
        }
      });
  }

  delete(item: StudentContext) {
    this.messagefromPromise(this.ts.changeObject(`/studentContext/${this.studentId}/${this.blockId}/${item.key}`), 'Context Deleted')
  }

  change($event) {
    if ($event.bool === true ) {
      this.messagefromPromise(this.ts.putStudentInCell(this.studentId, $event.key, this.blockId), 'Student Added');
    } else { if (this.attainedCells.length > 1) {
        this.messagefromPromise(this.ts.removeStudentFromCell(this.studentId, $event.key), 'Student Removed');
      } else {
        this.messagefromPromise(this.ts.removeStudentFromCell(this.studentId, $event.key), 'Student Removed');
        this.attainedCells = [];
      }
    }
  }

  multiAdd($event) {
    this.messagefromPromise(this.ts.putStudentInCellMulti($event.context, this.studentId, $event.cell, this.blockId), 'Event Added');
  }

  removeEvent($event) {
    if (this.learningEvents[$event.cellKey].length > 1) { this.messagefromPromise(
      this.ts.removeEventFromStudentMulti(this.studentId, $event.eventKey, $event.cellKey, this.blockId), 'Event Removed');
    } else {
      this.messagefromPromise(
        this.ts.removeEventFromStudentMulti(this.studentId, $event.eventKey, $event.cellKey, this.blockId, true), 'Event Removed');
        this.learningEvents[$event.cellKey] = [];
        delete this.eventCount[$event.cellKey];
    }
  }

  messagefromPromise(data: Promise<any>, success = 'Success', error = 'Bugger') {
    data
      .then(_ => this.openSnackBar(success, 'Awesome'))
      .catch(err => this.openSnackBar(`error`, 'Bugger'));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
