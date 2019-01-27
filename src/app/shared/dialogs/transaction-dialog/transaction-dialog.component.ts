import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

import { Transaction } from '../../../core/models/transaction';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss']
})
export class TransactionDialogComponent {
  @Output() updated = new EventEmitter<Transaction>();

  form = new FormGroup({
    date: new FormControl(new Date()),
    description: new FormControl(''),
    amount: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public transaction: Transaction
  ) {
    this.form.patchValue({
      date: transaction.date,
      description: transaction.description,
      amount: transaction.amount
    });
  }

  onSubmit() {
    if (this.form.dirty) {
      this.updated.emit({
        ...this.transaction,
        ...this.form.value
      });
    }
    this.dialogRef.close();
  }

  onClearClick() {
    this.updated.emit({
      ...this.transaction,
      cleared: !this.transaction.cleared
    });
  }
}
