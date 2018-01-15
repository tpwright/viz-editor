import { Component, Inject }                        from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AbstractControl}                           from '@angular/forms';
import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType}                from '@covalent/dynamic-forms';
import { IEditListItem }                            from '../interfaces/i-edit-list-item';
import { Settings }                                 from '../models/settings';
import { SettingsService } from '../settings.service';

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
              @Inject(MAT_DIALOG_DATA) public data :IEditListItem[],   private service: SettingsService)
  {
    this.settingsList = data;
    this.dynamicSettingsList = this.formatConfig(data);
  }

  
  
  save(data): void{
    console.log(data.value); //data example : {defPageHeight: "1000", defPageWidth: 1200, defScale: 3, defConveyorWidthIn: 24}
    let rArray = []; 
    this.settingsList.forEach(function(element){
      if (data.value[element.name]){
        element.value = data.value[element.name];
        rArray.push(element);
      }});
    //what the heck rArray isn't the expected value at all.
    let rVal = data.value
      rVal.displayableProperties = this.settingsList;//this is stupid
      
    this.dialogRef.close(rVal);
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
