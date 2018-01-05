import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/subject';
import { Observable } from 'rxjs/Rx';


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

    findItemForObjectList(listPath: string, objectPath: string, listKey: string): Observable<any> {
        return this.findItemsForKeyList(objectPath, this.findObjectPath(`${listPath}/${listKey}`).map(c => Object.keys(c.payload.val())) );
    }

    createListfromArray(path: string, a: any[]): Promise<any> {
        const dataToSave = this.createNumberedObjectFromArray(a);
        const itemsRef = this.db.object(path);
        return itemsRef.set(dataToSave);
    }

    createNumberedObjectFromArray(a): object {
        const L = a.length;
        const indexArray = Array.from(new Array(L ), (val, index) => index);
        const obj = indexArray.reduce((o, key) => ({ ...o, [key]: a[key]} ), {});
        return obj;
    }

    fireBaseUpdate(dataToSave) {
        return this.db.object('/').update(dataToSave);
    }
}
