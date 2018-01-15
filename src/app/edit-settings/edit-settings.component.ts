import { Component, Inject }                        from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatFormFieldModule }                       from '@angular/material/form-field';
import { MatInputModule}                            from '@angular/material/input';

import { IEditListItem }                            from '../interfaces/i-edit-list-item';
import { Settings }                                 from '../models/settings';

@Component({
  selector: 'app-edit-settings',
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.scss']
})
export class EditSettingsComponent
{

  public settingsList :IEditListItem[];

  constructor(public dialogRef :MatDialogRef<EditSettingsComponent>,
              @Inject(MAT_DIALOG_DATA) public data :IEditListItem[])
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
