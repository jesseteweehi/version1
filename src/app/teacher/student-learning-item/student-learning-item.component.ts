import { DefaultRouteReuseStrategy } from '@angular/router/src/route_reuse_strategy';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router/';
import { Student, LearningBlock, LearningGroup, Cell } from '../../global/models/classes';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/subject';
import * as _ from 'lodash';

import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/combineLatest';
import { Router } from '@angular/router';

// export declare class DefaultRouteReuseStrategy implements RouteReuseStrategy {
//   shouldDetach(route: ActivatedRouteSnapshot): boolean;
//   store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void;
//   shouldAttach(route: ActivatedRouteSnapshot): boolean;
//   retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null;
//   shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean;
// }

@Component({
  selector: 'app-student-learning-item',
  templateUrl: './student-learning-item.component.html',
  styleUrls: ['./student-learning-item.component.css']
})
export class StudentLearningItemComponent implements  OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();

  studentId: string;
  student: Observable<Student>;

  enrolledGroupKeys: string[] = [];
  enrolledBlockKeys: string[] = [];
  attainedBlockKeys: string[] = [];
  attainedCellsKeys: string[] = [];
  status: object = {};
  blockArrayForGroupKey: Object = {};

  enrolledBlocks: object;
  enrolledGroups: object;
  attainedCells: object;
  learningAreas: object;

  constructor(private ts: TeacherService,
              private route: ActivatedRoute,
              private router: Router) {
                this.router.routeReuseStrategy.shouldReuseRoute = function(){
                  return false; };
           }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studentId = params['studentid'];
      // this.router.navigated = false;
      // this.router.navigate([this.router.url]);
    });

    this.student = this.ts.findObjectPath(`studentProfile/${this.studentId}`)
      .map(item => Student.fromJson(item.key, {...item.payload.val()}));

    const enrolledBlocks = this.ts.findItemForObjectListWithPath(`studentLearning/${this.studentId}/enrolled`, 'learningBlock')
      .takeUntil(this.ngUnsubscribe)
      .map(changes => changes.map(c => LearningBlock.fromJson(c.key, {...c.payload.val()})))
      .map(LearningBlock.fromJsonToObject);

    const enrolledGroups = this.ts.findItemForObjectListWithPath(`studentLearning/${this.studentId}/enrolled`, 'learningBlock')
      .takeUntil(this.ngUnsubscribe)
      .map(changes => changes.map(c => c.payload.val().parent))
      .map(result => _.uniq(result))
      .switchMap(result => this.ts.findItemsForKeyList('learningGroup', Observable.of(result)))
      .map(changes => changes.map(c => LearningGroup.fromJson(c.key, {...c.payload.val()})))
      .map(LearningGroup.fromJsonToObject);

    const learningAreas = this.ts.findObjectPath('learningArea')
      .takeUntil(this.ngUnsubscribe)
      .map(c => c.payload.val());

    const attainedCells = this.ts.findItemForObjectListWithPath(`studentLearning/${this.studentId}/cells`, 'learningCell')
      .startWith([])
      .takeUntil(this.ngUnsubscribe)
      .map(changes => changes.map(c =>  {
        if (c.payload) {
          return Cell.fromJson(c.key, {...c.payload.val()});
        } else {
          return c;
        }
      }))
      .map(Cell.fromJsonToObject);

    Observable.combineLatest(enrolledBlocks, enrolledGroups, learningAreas, attainedCells ).subscribe(result => {
      this.enrolledBlocks = result[0];
      this.enrolledGroups = result[1];
      this.learningAreas = result[2];
      this.attainedCells = result[3];
      this.calculate();
     });
}

  calculate() {
    if (this.enrolledBlocks && this.enrolledGroups && this.attainedCells) {
      // Create Key Arrays
      this.enrolledGroupKeys = Object.keys(this.enrolledGroups);
      this.enrolledBlockKeys = Object.keys(this.enrolledBlocks);
      this.attainedCellsKeys = Object.keys(this.attainedCells);
      this.attainedBlockKeys = this.attainedCellsKeys.map(key => this.attainedCells[key].parent);

      // Create Enrolled Blocks Keys Array and create the Keys to Array block ArrayForGroupKey
      this.enrolledBlockKeys.forEach(key => {
        this.blockArrayForGroupKey[this.enrolledBlocks[key].parent] = [];
      });

      // Create Status and finalise Blocks to Array
      this.enrolledBlockKeys.forEach(key => {
        this.blockArrayForGroupKey[this.enrolledBlocks[key].parent].push(key);
        if (this.attainedBlockKeys.includes(key)) { this.status[key] = 'In Progress'; } else { this.status[key] = 'Not Started'; }
      });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
