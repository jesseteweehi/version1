import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/subject';

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { EmailDialogComponent } from '../forms/email-forms.component';
import { AdminService } from '../admin.service';
import { UserDialogComponent } from '../forms/users-forms.component';
import { UserProfile } from '../../global/models/classes';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();

  DialogRef: MatDialogRef<UserDialogComponent>;

  items: UserProfile[];

  constructor(private as: AdminService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar) { }


  ngOnInit() {
    this.as.findList(`/users`)
      .takeUntil(this.ngUnsubscribe)
      .do(console.log)
      .map(changes => changes.map(c => UserProfile.fromJson(c.payload.key, {...c.payload.val()} )))
      .do(console.log)
      .subscribe(result => this.items = result);
  }

  add(item: UserProfile) {
    this.DialogRef = this.dialog.open(UserDialogComponent, {
      data: {
        currentFormValues: item
      }
    });
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        this.messagefromPromise(this.as.changeObject(`/users/${item.key}`, x.data.value));
      });
  }

  delete(item: UserProfile) {
    this.messagefromPromise(this.as.changeObject(`/users/${item.key}`), 'User Deleted')
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
