import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/subject';
import { Observable } from 'rxjs/Rx';
import { database } from 'firebase/app';


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

    createStudent(data: any): Promise<any> {
        const itemToSave = Object.assign({ lastModified: firebase.database.ServerValue.TIMESTAMP}, data);
        const itemRefKey = this.db.list('/students').push(data).key;
        const dataToSave = {};
        dataToSave[`students/${itemRefKey}`] = itemToSave;
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
        const itemToSave = Object.assign({
            parent: parentKey, lastModified: firebase.database.ServerValue.TIMESTAMP, isLocked: false, isMulti: false}, data);
        const itemRefKey = this.db.list('/learningBlock').push(data).key;
        const dataToSave = {};
        dataToSave[`learningBlock/${itemRefKey}`] = itemToSave;
        dataToSave[`learningBlockForGroup/${parentKey}/${itemRefKey}`] = true;
        return this.fireBaseUpdate(dataToSave);
    }

    createSchoolCourse(data: any) {
        const itemToSave = Object.assign({ lastModified: firebase.database.ServerValue.TIMESTAMP}, data);
        const itemRefKey = this.db.list('/schoolCourse').push(data).key;
        const dataToSave = {};
        dataToSave[`schoolCourse/${itemRefKey}`] = itemToSave;
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

    saveLearningBlockData(key: string, data: any): Promise<any> {
        const cells = data.cells;
        const keys: object = {};
        const headers = Object.assign({xheader : data.xheader, yheader : data.yheader });
        cells.forEach((element, i) => {keys[i] = this.db.list('/learningCell').push(element).key; });
        const dataToSave = {};
        cells.forEach((cell, i ) => {
            const itemToSave = Object.assign({parent: key}, cell );
            dataToSave[`learningCell/${keys[i]}`] = itemToSave;
            dataToSave[`learningCellForBlock/${key}/${keys[i]}`] = true;
        });
        dataToSave[`header/${key}`] = headers;
        return this.fireBaseUpdate(dataToSave);
    }

    clearLearningBlockData(key: string): Promise<any> {
        const dataToSave = {};
        dataToSave[`learningCellForBlock/${key}`] = null;
        dataToSave[`header/${key}`] = null;
        return this.fireBaseUpdate(dataToSave);
    }

    lockLearningBlock(key: string): Promise<any> {
        const dataToSave = {}
        dataToSave[`learningBlock/${key}/isLocked`] = true;
        return this.fireBaseUpdate(dataToSave);
    }

    multiLearningBlock(key: string, b: boolean): Promise<any> {
        const dataToSave = {}
        dataToSave[`learningBlock/${key}/isMulti`] = b;
        return this.fireBaseUpdate(dataToSave);
    }

    // putStudentsInCell(studentKeys: string[], cellKey: string, blockKey: string, groupKey: string): Promise<any> {
    //     const dataToSave = {};
    //     studentKeys.forEach(key => {
    //         dataToSave[`studentsForCell/${cellKey}/${key}`] = true;
    //         dataToSave[`studentsEnrolledforBlock/${blockKey}/${key}`] = true;
    //         dataToSave[`studentLearning/${key}/groups/${groupKey}`] = true;
    //         dataToSave[`studentLearning/${key}/blocks/${blockKey}`] = true;
    //         dataToSave[`studentLearning/${key}/enrolled/${blockKey}`] = true;
    //         dataToSave[`studentLearning/${key}/cells/${cellKey}`] = true;
    //     });
    //     return this.fireBaseUpdate(dataToSave);
    // }

    // removeStudentsFromCell(studentKeys: string[], cellKey: string): Promise<any> {
    //     const dataToSave = {};
    //     studentKeys.forEach(key => {
    //         dataToSave[`studentsForCell/${cellKey}/${key}`] = null;
    //         dataToSave[`studentLearning/${key}/cells/${cellKey}`] = null;
    //     });
    //     return this.fireBaseUpdate(dataToSave);
    // }

    enrollStudentsInBlock(studentKeys: string[], blockKey: string ): Promise<any> {
        const dataToSave = {};
        studentKeys.forEach(key => {
            dataToSave[`studentsEnrolledForBlock/${blockKey}/${key}`] = true;
            dataToSave[`studentLearning/${key}/enrolled/${blockKey}`] = true;
        });
        return this.fireBaseUpdate(dataToSave);
    }

    unenrollStudentsFromBlock(studentKeys: string[], blockKey: string ): Promise<any> {
        const dataToSave = {};
        studentKeys.forEach(key => {
            dataToSave[`studentsEnrolledForBlock/${blockKey}/${key}`] = null;
            dataToSave[`studentLearning/${key}/enrolled/${blockKey}`] = null;
        });
        return this.fireBaseUpdate(dataToSave);
    }

    findItemsForKeyList(path: string, ob: Observable<any[]>): Observable<any> {
         return ob
                 .filter(x => x !== undefined)
                 .map(observ => observ.map(key => this.findObjectKey(path, key)))
                 .flatMap(result => Observable.combineLatest(result));
    }

    findItemForObjectList(listPath: string, objectPath: string, listKey: string): Observable<any> {
        return this.findItemsForKeyList(objectPath, this.findObjectPath(`${listPath}/${listKey}`)
            .map(c => {
                if (c.payload.val()) {
                    return Object.keys(c.payload.val());
                }
            }));
    }

    findItemForObjectListWithPath(listPath: string, objectPath: string ): Observable<any> {
        return this.findItemsForKeyList(objectPath, this.findObjectPath(`${listPath}`)
            .map(c => {
                if (c.payload.val()) {
                    return Object.keys(c.payload.val());
                }
            }));
    }

    fireBaseUpdate(dataToSave) {
        return this.db.object('/').update(dataToSave);
    }

    fireBaseSet(dataToSave) {
        return this.db.object('/').set(dataToSave);
    }
}
