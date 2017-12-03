import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTabsModule, MatTabChangeEvent }     from '@angular/material/tabs';
import { LayoutPage }                           from '../layout-page'
import { LayoutPageService }                    from '../layout-page.service';
import { StatusItemListComponent }              from '../status-item-list/status-item-list.component';

@Component({
  selector: 'app-layout-tabs',
  templateUrl: './layout-tabs.component.html',
  styleUrls: [ '../globals/styles/_colors.scss', './layout-tabs.component.scss' ],
  encapsulation: ViewEncapsulation.None
})

export class LayoutTabsComponent implements OnInit {

  constructor(private layoutPageService: LayoutPageService)
  {
    this.layoutPages = this.layoutPageService.getLayoutPages();
  }

  ngOnInit()
  {
    this.selectedLayoutPage = (this.layoutPages && this.layoutPages.length > 0) ? this.layoutPages[0] : null;
    this.updateStatusItemActivePage();
  }

  layoutPages             :LayoutPage[];
  selectedLayoutPage      :LayoutPage;
  selectedTabIndex        :number = 0;
  selectedTabPageId       :number;
  statusItemListComponent :StatusItemListComponent;   // Set by app.component

  /*
   * Handler for 'selectedTabChange' event.
   */
  onSelectedTabChanged(pEvent :MatTabChangeEvent)
  {
    console.log("onSelectedTabChanged(): Begins; pEvent.index='" + pEvent.index + "'");
    this.selectedLayoutPage = this.layoutPages[pEvent.index];
    this.updateStatusItemActivePage();
    console.log("onSelectedTabChanged(): Ends; this.selectedTabIndex = '" + this.selectedTabIndex + "'");
  }

  /*
   * Determine a unique ID for a new layout page.
   */
  private getNewTabNo() :number
  {
    let maxVal = -1;
    for (let ix = 0; ix < this.layoutPages.length; ix++)
    {
      if (this.layoutPages[ix].id > maxVal)
      {
        maxVal = this.layoutPages[ix].id;
      }
    }

    return (maxVal + 1);
  }

  /*
   *  Create a new LayoutPage and insert it into the LayoutPages list.
   */
  addNewLayoutPage()
  {
    console.log("addNewLayoutPage(): Begins")
    let newPageId :number = this.layoutPageService.getNewLayoutPageId();
    let newPage: LayoutPage = { id: newPageId, value: 0 };
    this.layoutPages.splice(this.selectedTabIndex, 0, newPage);
    this.updateStatusItemActivePage();
    console.log("addNewLayoutPage(): Ends")
  }

  /*
   * Delete the specified LayoutPage from the list.
   */
  deleteTab()
  {
    this.layoutPages.splice(this.selectedTabIndex, 1);
    this.updateStatusItemActivePage();
  }

  /*
   *  Update the StatusItem which displays the current active page ID.
   */
  updateStatusItemActivePage()
  {
    if (this.statusItemListComponent)
    {
      this.statusItemListComponent.updateStatusItem('activePage', this.selectedLayoutPage.id.toString());
      console.log("updateStatusItemActivePage(): New value = '" + this.selectedLayoutPage.id + "'");
    }
  }

  /*
   * Activate the next/previous tab, wrapping
   * when beginning/end of list is reached.
   *  pStep < 0: go to previous tab.
   *  pstep > 0: go to next tab.
 */
  stepToTab(pStep :number)
  {
    if (pStep > 0)
    {
      this.selectedTabIndex = (this.selectedTabIndex < (this.layoutPages.length - 1)) ? (this.selectedTabIndex + 1) : 0;
    }

    if (pStep < 0)
    {
      this.selectedTabIndex = (this.selectedTabIndex > 0) ? this.selectedTabIndex - 1 : (this.layoutPages.length - 1);
    }
  }

  /*
   * Advance to the first or last tab.
   *  pStep < 0: go to first tab.
   *  pstep > 0: go to last tab.
   */
  goToTab(pStep :number)
  {
    if (pStep > 0)
    {
      this.selectedTabIndex = (this.layoutPages.length - 1);
    }

    if (pStep < 0)
    {
      this.selectedTabIndex = 0;
    }
  }
}
