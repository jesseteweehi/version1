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
            const itemToSave = Object.assign({ lastModified: firebase.database.ServerValue.TIMESTAMP}, data);
            dataToSave[path] = itemToSave;
        } else {
            dataToSave[path] = null;
        }
        return this.fireBaseUpdate(dataToSave);
    }

    createLearningGroup(data: any): Promise<any> {
        const itemToSave = Object.assign({ lastModified: firebase.database.ServerValue.TIMESTAMP}, data);
        const itemRefKey = this.db.list('/learningGroup').push(data).key;
        const dataToSave = {};
        dataToSave[`learningGroup/${itemRefKey}`] = itemToSave;
        return this.fireBaseUpdate(dataToSave);
    }

    createLearningArea(data: any): Promise<any> {
        const itemToSave = Object.assign({ lastModified: firebase.database.ServerValue.TIMESTAMP}, data);
        const itemRefKey = this.db.list('/learningArea').push(data).key;
        const dataToSave = {};
        dataToSave[`learningArea/${itemRefKey}`] = itemToSave;
        return this.fireBaseUpdate(dataToSave);
    }

    createLearningBlock(parentKey: string, data: any) {
        const itemToSave = Object.assign({ lastModified: firebase.database.ServerValue.TIMESTAMP}, data);
        const itemRefKey = this.db.list('/learningBlock').push(data).key;
        const dataToSave = {};
        dataToSave[`learningBlock/${itemRefKey}`] = itemToSave;
        dataToSave[`learningBlockForGroup/${parentKey}/${itemRefKey}`] = true;
        return this.fireBaseUpdate(dataToSave);
    }

    createLearningMatrix(data: any): Promise<any> {
        const itemToSave = Object.assign({ lastModified: firebase.database.ServerValue.TIMESTAMP}, data);
        const itemRefKey = this.db.list('/learningMatrix').push(data).key;
        const dataToSave = {};
        dataToSave[`learningMatrix/${itemRefKey}`] = itemToSave;
        return this.fireBaseUpdate(dataToSave);
    }

    createLearningMatrixData(parentKey: string, xheaders: any[], yheaders: any[], cells: any[], data: any): Promise<any> {
        const xHeaderObject = {};
        const yHeaderObject = {};
        const cellsObject = {};
        xheaders.forEach((element, i) => xHeaderObject[i] = element );
        yheaders.forEach((element, i) => yHeaderObject[i] = element );
        cells.forEach((element, i) => cellsObject[i] = element );
        const matrixData = Object.assign({xheader : xHeaderObject, yheader : yHeaderObject, cells : cellsObject });

        const itemToSave = Object.assign({ lastModified: firebase.database.ServerValue.TIMESTAMP}, data);
        const itemRefKey = this.db.list('/learningMatrixVersion').push(data).key;
        const dataToSave = {};
        dataToSave[`learningMatrixVersion/${itemRefKey}`] = itemToSave;
        dataToSave[`learningMatrixVersionForMatrix/${parentKey}/${itemRefKey}`] = true;
        dataToSave[`learningMatrixVersionData/${itemRefKey}`] = matrixData;
        return this.fireBaseUpdate(dataToSave);
    }

    saveLearningMatrixData(key: string, xheaders: any[], yheaders: any[], cells: any[]): Promise<any> {
        const xHeaderObject = {};
        const yHeaderObject = {};
        const cellsObject = {};
        xheaders.forEach((element, i) => xHeaderObject[i] = element );
        yheaders.forEach((element, i) => yHeaderObject[i] = element );
        cells.forEach((element, i) => cellsObject[i] = element );
        const matrixData = Object.assign({xheader : xHeaderObject, yheader : yHeaderObject, cells : cellsObject });
        const dataToSave = {};
        dataToSave[`learningMatrixVersionData/${key}`] = matrixData;
        return this.fireBaseUpdate(dataToSave);
    }

    findItemsForKeyList(path: string, ob: Observable<any[]>): Observable<any> {
        return ob.map(observ => observ.map(key => this.findObjectKey(path, key)))
                 .flatMap(result => Observable.combineLatest(result));
    }

    findItemForObjectList(listPath: string, objectPath: string, listKey: string): Observable<any> {
        return this.findItemsForKeyList(objectPath, this.findObjectPath(`${listPath}/${listKey}`).map(c => Object.keys(c.payload.val())) );
    }

    // createListfromArray(path: string, a: any[]): Promise<any> {
    //     const dataToSave = this.createNumberedObjectFromArray(a);
    //     const itemsRef = this.db.object(path);
    //     return itemsRef.set(dataToSave);
    // }

    // createNumberedObjectFromArray(a): object {
    //     const L = a.length;
    //     const indexArray = Array.from(new Array(L ), (val, index) => index);
    //     const obj = indexArray.reduce((o, key) => ({ ...o, [key]: a[key]} ), {});
    //     return obj;
    // }

    fireBaseUpdate(dataToSave) {
        return this.db.object('/').update(dataToSave);
    }
}
