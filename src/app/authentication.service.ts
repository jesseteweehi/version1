import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'
import { UserProfile } from './global/models/classes';




@Injectable()
export class AuthenticationService {
    user$: BehaviorSubject<UserProfile> = new BehaviorSubject(null)

    constructor(private db: AngularFireDatabase,
        private afAuth: AngularFireAuth,
        private router: Router) {

        this.afAuth.authState
            .switchMap(user => {
                if (user) {
                        console.log(user.uid);
                        return this.db.object(`users/${user.uid}`).snapshotChanges()
                            .map(item => UserProfile.fromJson(item.key, {...item.payload.val()}));
                    } else {
                      return Observable.of(null);
                    }
            })
            .subscribe(user => {
                this.user$.next(user);
              });
    }

    login() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
            (success) => {
                this.router.navigateByUrl('/');
            }).catch((err) => {
                console.log(err);
            });
    }


    logout() {
        this.afAuth.auth.signOut().then(
            (success) => {
                this.router.navigateByUrl('/');
            }).catch((err) => {
            console.log(err);
            });
        }

    admin(user: UserProfile): boolean {
        const allowed = ['admin'];
        return this.checkAuthorization(user, allowed);
        }

    teacher(user: UserProfile): boolean {
        const allowed = ['teacher', 'admin'];
        return this.checkAuthorization(user, allowed);
        }

    subscriber(user: UserProfile): boolean {
        const allowed = ['subscriber'];
        return this.checkAuthorization(user, allowed);
        }
     // determines if user has matching role

    private checkAuthorization(user: UserProfile, allowedRoles: string[]): boolean {
    for (const role of allowedRoles) {
        if ( user.role[role] ) {
            return true;
            }
        }   return false;
    }
}
