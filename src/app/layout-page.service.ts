import { Injectable }       from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { map }              from 'rxjs/operators';
import { LayoutPage }       from "./layout-page";

@Injectable()
export class LayoutPageService {

  private _dataStore      :LayoutPage[];
  private defLayoutPages  :LayoutPage[] = [ { id: 0, value: 0 },
                                            { id: 1, value: 0 },
                                            { id: 2, value: 0 },
                                            { id: 3, value: 0 },
                                            { id: 4, value: 0 }, ];
  private _layoutPages$   :BehaviorSubject<LayoutPage[]>; 

  constructor()
  {
    this._dataStore = this.copyLayoutPageArray(this.defLayoutPages);
    // this._layoutPages$ = <BehaviorSubject<LayoutPage[]>>new BehaviorSubject(Object.assign({}, this._dataStore));  
    this._layoutPages$ = <BehaviorSubject<LayoutPage[]>>new BehaviorSubject(this.copyLayoutPageArray(this._dataStore));  
    console.log(`LayoutPageService.constructor(): this._dataStore contains '${this._dataStore.length}' items`)  
  }

  get LayoutPages$() :Observable<LayoutPage[]>
  {
    return this._layoutPages$.asObservable();
  }

  /*
   * Delete from the LayoutPage array that page whose 'id'
   * matches that specified.
   * 
   * Return: the array index of the deleted LayoutPage or
   * 'null' if it was not found.
   */
  public deleteLayoutPage(pPageId :number): number
  {
    console.log(`LayoutPageService.deleteLayoutPage(): Begins; LayoutPage.id = '${pPageId}'`);
    var index = this._dataStore.findIndex(x => x.id == pPageId);
    if (index > -1)
    {
      this._dataStore.splice(index, 1);
      this._layoutPages$.next(this.copyLayoutPageArray(this._dataStore));
      console.log(`LayoutPageService.deleteLayoutPage(): LayoutPage.id = '${pPageId}' deleted`);
      
      return(index);
    }
    else
    {
      console.log(`LayoutPageService.deleteLayoutPage(): LayoutPage.id = '${pPageId}' not found; cannot delete!`);
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
    this.assignLayoutPageId(pPage);
    this._dataStore.splice(pIndex, 0, pPage);
    this._layoutPages$.next(this.copyLayoutPageArray(this._dataStore));
    console.log(`LayoutPageService.insertLayoutPage(): Ends; '${pPage.id}' inserted at index = ${pIndex}`)
    
    return(pIndex);
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
    var index = this._dataStore.findIndex(x => x.id == pPage.id);
    if (index > -1)
    {
      this._dataStore[index] = pPage;
      this._layoutPages$.next(this.copyLayoutPageArray(this._dataStore));
      console.log(`LayoutPageService.updateLayoutPage(): LayoutPage.id = '${pPage.id}' updated`);
      
      return(index);
    }
    else
    {
      console.log(`LayoutPageService.updateLayoutPage(): LayoutPage.id = '${pPage.id}' not found; cannot update!`);
      return(null);
    }
  }

  /*
   *  Assign a unique 'id' to the specified LayoutPage,
   *  but only if it does not already have one.
   */
  private assignLayoutPageId(pLayoutPage :LayoutPage) :void
  {
    if (pLayoutPage && (pLayoutPage.id == null || pLayoutPage.id == undefined))
    {
      let lastPageId: number = -1;
      
      for (let ix = 0; ix < this._dataStore.length; ix++)
      {
        if (this._dataStore[ix].id > lastPageId)
        {
          lastPageId = this._dataStore[ix].id;
        }
      }
      
      pLayoutPage.id = lastPageId + 1;
      console.log(`LayoutPageService.assignLayoutPageId(): LayoutPage.id='${pLayoutPage.id} was assigned`);
    }
  }

  private copyLayoutPageArray(pArray :LayoutPage[]) :LayoutPage[]
  {
    // return (Object.assign([], pArray));
    // let content :LayoutPage[] = [];
    // pArray.forEach(element =>
    //   {
    //     content.push( { id: element.id, value: element.value } );
    //   });
    // console.log(`LayoutPageService.copyLayoutPageArray(): content.length = '${content.length}`);
    // return (content);
    return (pArray);
  }
}
