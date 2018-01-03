import { Observable } from 'rxjs/Rx';
import { flatMap } from 'rxjs/add/operator/mergeMap';
import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/subject';

@Injectable()
export class TeacherService {

constructor(
    private db: AngularFireDatabase) {}

    findList(path: string): Observable<any[]> {
        return this.db.list(path).snapshotChanges();
    }

    findListFlatten(path: string): Observable<any> {
        return this.db.list(path).snapshotChanges();
    }

    findObjectPath(path: string): Observable<any> {
        return this.db.object(path).snapshotChanges();
    }

    findObjectKey(path: string, key: string): Observable<any> {
        path = `${path}/${key}`;
        return this.db.object(path).snapshotChanges();
    }

    changeObject(path: string,  data?: any): Promise<any> {
        const dataToSave = {};
        if (data) {
            const itemToSave = Object.assign({}, data);
            dataToSave[path] = itemToSave;
        } else {
            dataToSave[path] = null;
        }
        return this.fireBaseUpdate(dataToSave);
    }

    createLearningGroup(data: any): Promise<any> {
        const itemToSave = Object.assign({}, data);
        const itemRefKey = this.db.list('/learningGroup').push(data).key;
        const dataToSave = {};
        dataToSave[`learningGroup/${itemRefKey}`] = itemToSave;
        return this.fireBaseUpdate(dataToSave);
    }

    createLearningArea(data: any): Promise<any> {
        const itemToSave = Object.assign({}, data);
        const itemRefKey = this.db.list('/learningArea').push(data).key;
        const dataToSave = {};
        dataToSave[`learningArea/${itemRefKey}`] = itemToSave;
        return this.fireBaseUpdate(dataToSave);
    }

    createLearningBlock(parentKey: string, data: any) {
        const itemToSave = Object.assign({}, data);
        const itemRefKey = this.db.list('/learningBlock').push(data).key;
        const dataToSave = {};
        dataToSave[`learningBlock/${itemRefKey}`] = itemToSave;
        dataToSave[`learningBlockForGroup/${parentKey}/${itemRefKey}`] = true;
        return this.fireBaseUpdate(dataToSave);
    }

    findItemsForKeyList(path: string, ob: Observable<any[]>): Observable<any> {
        return ob.map(observ => observ.map(key => this.findObjectKey(path, key)))
                 .flatMap(result => Observable.combineLatest(result));
    }

    findItemForList(listPath: string, objectPath: string, listKey: string): Observable<any> {
        return this.findItemsForKeyList(objectPath, this.findObjectPath(listPath).map(c => c.payload.val()));
    }

    // findBlockKeysForGroups(blockKeys$: Observable<any[]>) : Observable<any> {
    //     return blockKeys$
    //         .map(bpg => bpg.map(blockKey => this.db.object('learningExperienceBlock/' + blockKey.$key)))
    //         .flatMap(fbojs => Observable.combineLatest(fbojs))

    // }

    // findBlocksForGroup(groupKey:string): Observable<any> {
    //     return this.findBlockKeysForGroups(this.db.list(`learningExperienceBlockForGroup/${groupKey}`))
    //         .map(LearningAssessmentBlockModel.fromJsonList)
    // }

    fireBaseUpdate(dataToSave) {
        return this.db.object('/').update(dataToSave);
    }
}
