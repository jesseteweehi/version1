import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Header, Cell, Student, LearningBlock } from './../../global/models/classes';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/subject';

import { TeacherService } from '../teacher.service';

import 'rxjs/add/operator/combineLatest';

@Component({
  selector: 'app-student-learning-grid',
  templateUrl: './student-learning-grid.component.html',
  styleUrls: ['./student-learning-grid.component.css']
})
export class StudentLearningGridComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();

  groupId: string;
  blockId: string;
  studentId: string;
  block: LearningBlock;
  student: Observable<Student>;

  xHeadersList: any[];
  yHeadersList: any[];
  cellsList: any[];
  attainedCells: string[];

  constructor(private ts: TeacherService,
              private route: ActivatedRoute,
              private location: Location,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.blockId = this.route.snapshot.params['blockid'];
    this.groupId = this.route.snapshot.params['groupid'];
    this.studentId = this.route.snapshot.params['studentid'];

    this.student = this.ts.findObjectPath(`studentProfile/${this.studentId}`)
      .map(item => Student.fromJson(item.key, {...item.payload.val()}));

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
        console.log(changes);
        if (changes.key) {
          return Object.keys(changes.payload.val());
        } else {
          return [];
        }
      });

    Observable.combineLatest(xHeader, yHeader, cells, attainedCells, block).subscribe(result => {
      console.log(result);
      this.xHeadersList = result[0];
      this.yHeadersList = result[1];
      this.cellsList = result[2];
      this.attainedCells = result[3];
      this.block = result[4];
                   });
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
    console.log($event);
    this.messagefromPromise(this.ts.putStudentInCellMulti($event.context, this.studentId, $event.cell, this.blockId), 'Event Added');
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
