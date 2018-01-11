import { Injectable }         from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { Observable }         from 'rxjs/Observable';

import { CookieService }      from 'ngx-cookie';
import { Settings }           from './models/settings';
import { buildEditList }      from './globals/utilities/buildEditList';

@Injectable()
export class SettingsService {

  private _settingsCookieKey = "editorSettings";
  private _settings   :Settings;
  private _settings$  :BehaviorSubject<Settings>;

  constructor(private _cookieService :CookieService)
  {
    console.log(`SettingsService.constructor(): Begins`)
    this.loadSettingsFromCookie();
    this._settings$ = <BehaviorSubject<Settings>>new BehaviorSubject(this._settings);  
    console.log(`SettingsService.constructor(): Ends`)
  }

  /*
   *  Retrieve the current Settings values.
   */
  public getSettings() :Settings
  {
    return this._settings;
  }

  /*
   *  Provide an iterable list of the setting names and their values.
   */
  // public getSettingsList() :{name :string, value :string|number|boolean}[]
  // {
  //     let sa :{name :string, value :string|number|boolean}[] = [];
  //     sa.push({name: "defPageHeight",      value: this._settings.defPageHeight});
  //     sa.push({name: "defPageWidth",       value: this._settings.defPageWidth});
  //     sa.push({name: "defScale",           value: this._settings.defScale});
  //     sa.push({name: "defConveyorWidthIn", value: this._settings.defConveyorWidthIn});
  //     return sa;
  // }
  public getSettingsList() :{ name :string,
                              value :string|number|boolean,
                              isEditable :boolean
                            }[]
{
    return buildEditList(this._settings, Settings.displayables);
}

  /*
   *  Initialize the local copy of the editor settings from the
   *  cookie object or persist the current (default) settings.
   */
  private loadSettingsFromCookie() :void
  {
    console.log(`SettingsService.loadSettingsFromCookie(): Begins`)
    if (this._cookieService.get(this._settingsCookieKey))
    {
      this._settings = this._cookieService.getObject(this._settingsCookieKey) as Settings;
      console.log(`SettingsService.loadSettingsFromCookie(): this._settings loaded from cookie: '${JSON.stringify(this._settings)}'`)
    }
    else
    {
      this._settings = new Settings;
      console.log(`SettingsService.loadSettingsFromCookie(): this._settings loaded from cookie: '${this._settings}'`)
    }
    console.log(`SettingsService.loadSettingsFromCookie(): Ends`)
  }

  /*
   *  Return: Observable that delivers Settings changes.
   */
  public get settings$() :Observable<Settings>
  {
    return this._settings$.asObservable();
  }

  /*
   *  Persist and publish the specified Settings values.
   */
  public updateSettings(pSettings :Settings)
  {
    console.log(`SettingsService.updateSettings(): Begins; pSettings = '${pSettings}'`)
    this._settings = pSettings;
    this._cookieService.putObject(this._settingsCookieKey, this._settings);
    this._settings$.next(this._settings);
    console.log(`SettingsService.updateSettings(): Ends`)
  }

  /*
    *  Apply the values contained in the provided list of setting names/values
    *  to the current settings.
    */
  public updateSettingsFromList(pSettingsList :{name :string, value :string|number|boolean}[]) :void
  {
    pSettingsList.forEach(setting =>
      {
        switch (setting.name)
        {
          case 'defPageHeight':
            this._settings.defPageHeight = setting.value as number;
            break;

          case 'defPageWidth':
            this._settings.defPageWidth = setting.value as number;
            break;
              
          case 'defScale':
            this._settings.defScale = setting.value as number;
            break;
              
          case 'defConveyorWidthIn':
            this._settings.defConveyorWidthIn = setting.value as number;
            break;
        }

        this._settings$.next(this._settings);
      });
  }
}
