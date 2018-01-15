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
      rVal.displayableProperties = this.settingsList;//todo: fix the settings object
      
    this.dialogRef.close(rVal);
  }

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
