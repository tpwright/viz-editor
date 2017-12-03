import { Injectable } from '@angular/core';
import { LayoutPage } from "./layout-page";

@Injectable()
export class LayoutPageService {

  constructor() { }

  layoutPages :LayoutPage[] = [
    { id: 0, value: 0 },
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 },   
  ]

  /*
   * Append the specified LayoutPage to the list.
   */
  public appendLayoutPage(pPage :LayoutPage)
  {
    this.layoutPages.push(pPage);
    console.log("Page '" + pPage.id + "' appended!");
  }

  /*
   * Delete the specified LayoutPage from the list.
   * Return: the index of the deleted LayoutPage.
   */
  public deleteLayoutPage(pPage :LayoutPage): number
  {
    var index = this.layoutPages.findIndex(x => x.id == pPage.id);
    if (index > -1)
    {
      this.layoutPages.splice(index, 1);
      console.log("Page '" + pPage.id + "' deleted!");

      return(index);
    }
    else
    {
      console.log("Page '" + pPage.id + "' not found; cannot delete!");
      return(-1);
    }
  }

  /*
   *  Return a reference to our list of LayoutPages.
   */
  public getLayoutPages() :LayoutPage[]
  {
    return(this.layoutPages);
  }

  /*
   *  Return a LayoutPage.id value suitable for use by a new LayoutPage.
   */
  public getNewLayoutPageId() :number
  {
    var lastPageId: number = -1;

    for (var ix = 0; ix < this.layoutPages.length; ix++)
    {
      if (this.layoutPages[ix].id > lastPageId)
      {
        lastPageId = this.layoutPages[ix].id;
      }
    }

    return(lastPageId + 1);
  }

  /*
   * Insert the specified LayoutPage at the front of the list
   * and return its index.
   */
  public insertLayoutPage(pPage :LayoutPage, pIndex :Number): number
  {
    console.log("Page '" + pPage.id + "' inserted!");
    this.layoutPages.unshift(pPage);

    return(0);
  }
}
