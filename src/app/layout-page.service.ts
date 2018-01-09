import { Injectable, OnInit, OnDestroy }  from '@angular/core';
import { BehaviorSubject }                from 'rxjs/BehaviorSubject';
import { Observable }                     from 'rxjs/Observable';
import { Subscription }                   from 'rxjs/Subscription';
import { map }                            from 'rxjs/operators';

import { LayoutPage }                     from './models/layout-page';
import { Settings }                       from './models/settings';
import { SettingsService }                from './settings.service';


@Injectable()
export class LayoutPageService implements OnInit, OnDestroy {

  private _dataStore      :LayoutPage[] = [];
  private _layoutPages$   :BehaviorSubject<LayoutPage[]>;
  private _settings       :Settings
  private _subscriptions  :Subscription[] = [];

  constructor(private _settingsService :SettingsService)
  {
    this._layoutPages$ = <BehaviorSubject<LayoutPage[]>>new BehaviorSubject(this._dataStore);  
    this._subscriptions.push(_settingsService.settings$.subscribe(data => this.updateSettings(data)));
  }

  ngOnInit()
  {
    console.log(`LayoutPageService.ngOnInit(): Begins`)
    this._settings = this._settingsService.getSettings();
    console.log(`LayoutPageService.ngOnInit(): Ends`)
  }

  ngOnDestroy()
  {
    let sub :Subscription;
    while (sub = this._subscriptions.pop())
    {
      sub.unsubscribe();
    }
  }

  /*
   *  If it does not already have one, Assign a (unique) 'name'
   *  to the specified LayoutPage.
   */
  private _lastTime : number;
  private assignLayoutPageName(pLayoutPage :LayoutPage) :void
  {
    if (pLayoutPage && (!pLayoutPage.name))
    {
      let now = new Date();

      let YY = (now.getFullYear() % 1000).toString().padStart(2, '0');
      let MM = (now.getMonth() + 1).toString().padStart(2, '0');
      let DD = now.getDate().toString().padStart(2, '0');
      let time = now.getHours();
      time = time * 100 + now.getMinutes();
      time = time * 100 + now.getSeconds(); 
      time = time * 1000 + now.getMilliseconds();
      while (time <= this._lastTime)
      {
        time += 1;
      }

      this._lastTime = time;
      
      pLayoutPage.name = `${YY}${MM}${DD}${time.toString().padStart(9, '0')}`;
      console.log(`LayoutPageService.assignLayoutPageName(): LayoutPage.name='${pLayoutPage.name} was assigned`);
    }
  }

  /*
   *  Delete the entire collection of LayoutPages.
   */
  public deleteAllLayoutPages() :void
  {
    console.log(`LayoutPageService.deleteAllLayoutPages(): Begins`);
    this._dataStore = [];
    this._layoutPages$.next(this._dataStore);
    console.log(`LayoutPageService.deleteAllLayoutPages(): Ends`);
  }

  /*
   * Delete from the LayoutPage collection that page
   * whose 'name' matches that specified.
   * 
   * Return: the array index of the deleted LayoutPage or
   * 'null' if it was not found.
   */
  public deleteLayoutPage(pPageName :string): number
  {
    console.log(`LayoutPageService.deleteLayoutPage(): Begins; LayoutPage.name = '${pPageName}'`);
    var index = this._dataStore.findIndex(x => x.name == pPageName);
    if (index > -1)
    {
      this._dataStore.splice(index, 1);
      this._layoutPages$.next(this._dataStore);
      console.log(`LayoutPageService.deleteLayoutPage(): LayoutPage.name = '${pPageName}' deleted`);
      
      return(index);
    }
    else
    {
      console.log(`LayoutPageService.deleteLayoutPage(): LayoutPage.name = '${pPageName}' not found; cannot delete!`);
      return(null);
    }
  }

  /*
   * Insert the specified LayoutPage at the position in the list
   * specified by pIndex, returning the index if the insertion
   * was successful.
   * 
   * Return: the index of the inserted LayoutPage.
   */
  public insertLayoutPage(pPage :LayoutPage, pIndex :number = 0): number
  {
    console.log(`LayoutPageService.insertLayoutPage(): Begins`)
    this.assignLayoutPageName(pPage);
    this._dataStore.splice(pIndex, 0, pPage);
    this._layoutPages$.next(this._dataStore);
    console.log(`LayoutPageService.insertLayoutPage(): Ends; '${pPage.name}' inserted at index = ${pIndex}`)
    
    return(pIndex);
  }

  /*
   *  Return: Observable that delivers LayoutPage collection changes.
   */
  public get layoutPages$() :Observable<LayoutPage[]>
  {
    return this._layoutPages$.asObservable();
  }

  /*
   *  Replace the Layout Pages collection with the one supplied.
   */
  public replaceAllLayoutPages(pData :LayoutPage[]) : void
  {
    console.log(`LayoutPageService.replaceAllLayoutPages(): Begins`)

    this._dataStore = pData;
    this._layoutPages$.next(this._dataStore);
    
    console.log(`LayoutPageService.replaceAllLayoutPages(): Ends; this._dataStore.Length = '${this._dataStore.length}'`);
  }

  /*
   * Replace the LayoutPage in the list whose 'id' matches
   * that of the provided one.
   * 
   * Return: the index of the updated LayoutPage or 'null'
   *         if it was not found.
   */
  public updateLayoutPage(pPage :LayoutPage) :number
  {
    let index = this._dataStore.findIndex(x => x.name == pPage.name);
    if (index > -1)
    {
      this._dataStore[index] = pPage;
      this._layoutPages$.next(this._dataStore);
      console.log(`LayoutPageService.updateLayoutPage(): LayoutPage.name = '${pPage.name}' updated`);
      
      return(index);
    }
    else
    {
      console.log(`LayoutPageService.updateLayoutPage(): LayoutPage.name = '${pPage.name}' not found; cannot update!`);
      return(null);
    }
  }

  /*
   *  Save the newly-arrived Settings.
   */
  private updateSettings(pData :Settings) :void
  {
    console.log(`LayoutPageService.updateSettings(): Begins`)
    this._settings = pData;
    console.log(`LayoutPageService.updateSettings(): Ends`)    
  }
}
