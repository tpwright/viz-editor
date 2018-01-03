import { Injectable }       from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { StatusItem }       from "./status-item";

@Injectable()
export class StatusItemService {

  private _dataStore      :StatusItem[] = [];
  private _statusItems$ = new BehaviorSubject<StatusItem[]>(this._dataStore); 

  constructor()
  { }

  get statusItems$() :Observable<StatusItem[]>
  {
    return this._statusItems$.asObservable();
  }

  /*
   * Replace the StatusItem in the list whose 'key' matches
   * that of the provided one. If the StatusItem is not
   * located in the _dataStore, add it.
   */
  public updateStatusItem(pItem :StatusItem) :void
  {
    let ix = this._dataStore.findIndex(x => x.key == pItem.key);
    if (ix > -1)
    {
      this._dataStore[ix] = pItem;
      console.log(`StatusItemService.updateStatusItem(): StatusItem.key = '${pItem.key}' updated`);
    }
    else
    {
      this._dataStore.push(pItem);
      console.log(`StatusItemService.updateStatusItem(): StatusItem.key = '${pItem.key}' added`);
    }

    // Inform any subscribers of the update
    this._statusItems$.next(this._dataStore);
  }
}
