import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { ActivatedRoute } from '@angular/router/';
import { Student, LearningBlock, LearningGroup, Cell } from '../../global/models/classes';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/subject';
import * as _ from 'lodash';

import 'rxjs/add/operator/takeUntil';



@Component({
  selector: 'app-student-learning-item',
  templateUrl: './student-learning-item.component.html',
  styleUrls: ['./student-learning-item.component.css']
})
export class StudentLearningItemComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();

  studentId: string;
  student: Observable<Student>;

  enrolledBlocks: LearningBlock[];
  enrolledGroups: LearningGroup[];
  attainedCells: Cell[];

  constructor(private ts: TeacherService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // Want to Show the following
    // All groups either as "doing" or "Finished"
    // Doing as the following status
    // Not Started > Enrolled but no Learning Pieces have been attained | 
    // In Progress > Enrolled and 1 or more Learning Pieces have been attained

    // Create a Learning Block Enrolled Array, Create Learning Block Attained array using Learning Pieces Array Parent.
    // If key in Enrolled but not in Attained assign "Not Started" Status
    // If in both assign "In Progress" Status

    // Finished only has the finished Status Assign this status to an status object with the block key as status object key.

    // Creating the Visual to See Groups
    // Use the Group Enrolled Array.
    // Create and Enrolled Block Array for each a BlocktoGroup Object by using the Blocks parent status.
    // Status can be attached to each block by looking up the status object using block key.

    // So we Need:
    // LearningCell Keys that Are Attained (This will be sent to Grid)
    // Learning Groups Enrolled Array
    // learning Blocks Enrolled Array for each Group
    // Status Object for each Learning Block.


    this.studentId = this.route.snapshot.params['studentid'];

    this.student = this.ts.findObjectPath(`studentProfile/${this.studentId}`)
      .map(item => Student.fromJson(item.key, {...item.payload.val()}));

    const enrolledBlocks = this.ts.findItemForObjectListWithPath(`studentLearning/${this.studentId}/enrolled`, 'learningBlock')
      .takeUntil(this.ngUnsubscribe)
      .map(changes => changes.map(c => LearningBlock.fromJson(c.key, {...c.payload.val()})));

    const enrolledGroups = this.ts.findItemForObjectListWithPath(`studentLearning/${this.studentId}/enrolled`, 'learningBlock')
      .takeUntil(this.ngUnsubscribe)
      .map(changes => changes.map(c => c.payload.val().parent))
      .map(result => _.uniq(result))
      .switchMap(result => this.ts.findItemsForKeyList('learningGroup', Observable.of(result)))
      .map(changes => changes.map(c => LearningGroup.fromJson(c.key, {...c.payload.val()})));

    const attainedCells = this.ts.findItemForObjectListWithPath(`studentLearning/${this.studentId}/cells`, 'learningCell')
      .takeUntil(this.ngUnsubscribe)
      .map(changes => changes.map(c => Cell.fromJson(c.key, {...c.payload.val()})));

    enrolledBlocks.subscribe(result => this.enrolledBlocks = result);
    enrolledGroups.subscribe(result => this.enrolledGroups = result);
    attainedCells.subscribe(result => console.log(result));

    // this.ts.findObjectPath(`studentLearning/${this.studentId}/enrolled`)
    //   .takeUntil(this.ngUnsubscribe)
    //   .filter(x => x !== undefined) 
    //   .map(c => {
    //     return Object.keys(c.payload.val());
    //   })
    //   .subscribe(result => this.enrolledBlocks = result)
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}


// return this.findItemsForKeyList(objectPath, this.findObjectPath(`${listPath}/${listKey}`)
// .map(c => {
//     if (c.payload.val()) {
//         return Object.keys(c.payload.val());
//     }
// }));