import { LearningGroup } from './../../global/models/classes';
import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class TeacherService {

constructor(
    private db: AngularFireDatabase) {}

    findList(path: string): Observable<any[]> {
        return this.db.list(path).snapshotChanges(;
    }

    findObject(path: string, key: string): Observable<any> {
        return this.db.object(path).snapshotChanges();
    }
}
