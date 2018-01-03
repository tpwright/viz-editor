import { Component, Inject }                        from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})

export class ConfirmDialogComponent {

  constructor(public dialogRef :MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data :{title :string, message :string, prompt: string})
  { }

  onNoClick() :void
  {
    this.dialogRef.close();
  }
}
