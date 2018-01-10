import { Component, Inject, OnInit }                from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Settings }                                 from '../models/settings';

@Component({
  selector: 'app-edit-settings',
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.scss']
})
export class EditSettingsComponent implements OnInit
{

  constructor(public dialogRef :MatDialogRef<EditSettingsComponent>,
              @Inject(MAT_DIALOG_DATA) public data :[{name :string, value :string|number|boolean}])
  { }

  ngOnInit()
  { }

  closeDialog()
  {
    this.dialogRef.close('the new settings value');
  }
}
