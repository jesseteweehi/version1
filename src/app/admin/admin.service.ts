import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/subject';
import { Observable } from 'rxjs/Rx';
import { database } from 'firebase/app';

@Injectable()
export class AdminService {

    constructor(private db: AngularFireDatabase) {}

    findListValue(path: string): Observable<any[]> {
        return this.db.list(path).valueChanges();
    }

    findList(path: string): Observable<any[]> {
        return this.db.list(path).snapshotChanges();
    }

    setValue(path: string, data: any): Promise<any> {
        const ref = this.db.object(path);
        return ref.set(data);
    }

    getValue(path: string): Observable<any> {
        return this.db.object(path).valueChanges()
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

    fireBaseUpdate(dataToSave) {
        return this.db.object('/').update(dataToSave);
    }



}
