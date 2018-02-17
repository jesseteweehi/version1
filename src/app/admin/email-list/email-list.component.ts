import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/subject';

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { EmailDialogComponent } from '../forms/email-forms.component';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();

  DialogRef: MatDialogRef<EmailDialogComponent>;

  items: any[];

  constructor(private as: AdminService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.as.getValue('/emails')
      .takeUntil(this.ngUnsubscribe)
      .map(result => {
        return Object.keys(result);
      })
      .subscribe(items => this.items = items);
  }

  add() {
    this.DialogRef = this.dialog.open(EmailDialogComponent);
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
          this.messagefromPromise(this.as.setValue(`/emails/${x.data.value.email}`, true ), 'Email Added'); });
    }

  delete(item: string) {
    this.messagefromPromise(this.as.setValue(`/emails/${item}`, null), 'Email Deleted');
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
