import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/subject';

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { EmailDialogComponent } from '../forms/email-forms.component';
import { AdminService } from '../admin.service';
import { EmailList } from './../../global/models/classes';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();

  DialogRef: MatDialogRef<EmailDialogComponent>;

  items: EmailList[];

  constructor(private as: AdminService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    const items = this.as.findList('emails/')
      .takeUntil(this.ngUnsubscribe)
      .map(value => value
      .map(c => {
        return EmailList.fromJson(c.payload.key, {...c.payload.val()});
      }));

    items.subscribe(result => {
      console.log(result);
      this.items = result; } );
  }

  add() {
    this.DialogRef = this.dialog.open(EmailDialogComponent);
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
          this.messagefromPromise(this.as.createEmail(x.data.value), 'Email Added'); });
    }

  delete(item: EmailList) {
    this.messagefromPromise(this.as.changeObject(`emails/${item.key}`, false, false ), 'Email Deleted');
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
