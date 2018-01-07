import { Injectable }       from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { map }              from 'rxjs/operators';
import { LayoutPage }       from "./models/layout-page";


@Injectable()
export class LayoutPageService {

  private _dataStore      :LayoutPage[] = [];
  private _layoutPages$   :BehaviorSubject<LayoutPage[]>; 

  constructor()
  {
    this._layoutPages$ = <BehaviorSubject<LayoutPage[]>>new BehaviorSubject(this._dataStore);  
    this.loadLayoutPagesFromFile();
    console.log(`LayoutPageService.constructor(): this._dataStore contains '${this._dataStore.length}' items`)  
  }

  /*
   *  Assign a unique 'name' to the specified LayoutPage,
   *  but only if it does not already have one.
   */
  private assignLayoutPageName(pLayoutPage :LayoutPage) :void
  {
    if (pLayoutPage && (!pLayoutPage.name))
    {
      let now = new Date();
      let YY = (now.getFullYear() % 100).toString().padStart(2, '0');
      let MM = (now.getMonth() + 1).toString().padStart(2, '0');  // January == 0
      let DD = now.getDay().toString().padStart(2, '0');
      let hh = now.getHours().toString().padStart(2, '0');
      let mm = now.getMinutes().toString().padStart(2, '0');
      let ss = now.getSeconds().toString().padStart(2, '0');
      let ms = now.getMilliseconds().toString();


      pLayoutPage.name = `${YY}${MM}${DD}${hh}${mm}${ss}${ms}`;

      console.log(`LayoutPageService.assignLayoutPageId(): LayoutPage.name='${pLayoutPage.name} was assigned`);
    }
  }

  /*
   * Delete from the LayoutPage array that page whose 'id'
   * matches that specified.
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
   *  Return: Observable that delivers Layout Pages collection changes.
   */
  public get layoutPages$() :Observable<LayoutPage[]>
  {
    return this._layoutPages$.asObservable();
  }

  /*
   *  Load the Layout Pages collection from the last-opened data file (if any).
   */
  public loadLayoutPagesFromFile(pDataFilePath :string = null) : void
  {
    // Clear out any existing data
    if (this._dataStore.length > 0)
    {
      this._dataStore = [];
    }

    // Load the collection from the data file
    if (pDataFilePath)
    {
      // TODO:
    }
    else
    {
      // Temporary: initialize the collection
      for (let i = 1; i <= 4; i++)
      {
        let newPage = new LayoutPage(null, 500, 1200, 2);
        this.assignLayoutPageName(newPage);
        this._dataStore.push(newPage);
      }
    }
  
    // Publish the collection
    this._layoutPages$.next(this._dataStore);
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
}
