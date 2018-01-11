import { Component, Inject }                        from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Settings }                                 from '../models/settings';

@Component({
  selector: 'app-edit-settings',
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.scss']
})
export class EditSettingsComponent
{

  public settingsList :{name :string, value :string|number|boolean}[];

  constructor(public dialogRef :MatDialogRef<EditSettingsComponent>,
              @Inject(MAT_DIALOG_DATA) public data :{name :string, value :string|number|boolean}[])
  {
    this.settingsList = data;
  }

  closeDialog() :void
  {
    this.dialogRef.close(this.settingsList);
  }

  onNoClick(): void
  {
    this.dialogRef.close();
  }
}
