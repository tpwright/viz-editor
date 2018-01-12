import { Component, Inject }                        from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AbstractControl}                           from '@angular/forms';
import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType}                from '@covalent/dynamic-forms';
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

  public dynamicSettingsList : ITdDynamicElementConfig[];

  constructor(public dialogRef :MatDialogRef<EditSettingsComponent>,
              @Inject(MAT_DIALOG_DATA) public data :IEditListItem[])
  {
    this.settingsList = data;

    this.dynamicSettingsList = this.formatConfig(data);
  }

  closeDialog() :void
  {
    this.dialogRef.close(this.settingsList);
  }

  // For reference
 
  // customValidationElements: ITdDynamicElementConfig[] = [{
  //   name: 'evenElement',
  //   label: 'Even Number',
  //   type: TdDynamicType.Number,
  //   validators: [{
  //     validator: (control: AbstractControl) => {
  //       let isValid: boolean = (!control.value && control.value !== 0) || ((control.value % 2 ) === 0);
  //       return !isValid ? {even: true} : undefined;
  //     },
  //   }],
  // }, {
  //   name: 'oddInRangeElement',
  //   label: 'Odd Number Between 8 and 20',
  //   type: TdDynamicType.Number,
  //   min: 8,
  //   max: 20,
  //   validators: [{
  //     validator: (control: AbstractControl) => {
  //       let isValid: boolean = (!control.value && control.value !== 0) || ((control.value % 2) !== 0);
  //       return !isValid ? {odd: true} : undefined;
  //     },
  //   }],
  // }];

  formatConfig(obj: {name: string, value: string | number | boolean}[]) : ITdDynamicElementConfig[]{
    let rVal : ITdDynamicElementConfig[] = [];
    
    obj.forEach(element => {
      rVal.push({name: element.name, label: element.name, type: TdDynamicType.Number, default: element.value});
      
    });

    return rVal;
  }

  onNoClick(): void
  {
    this.dialogRef.close();
  }
}
