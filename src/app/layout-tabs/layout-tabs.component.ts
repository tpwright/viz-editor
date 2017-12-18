import { Component, ViewEncapsulation }         from '@angular/core';
import { OnInit, OnDestroy }                    from '@angular/core';
import { MatTabsModule, MatTabChangeEvent }     from '@angular/material/tabs';
import { Subscription }                         from 'rxjs/Subscription';
import { LayoutPage }                           from '../layout-page';
import { LayoutPageService }                    from '../layout-page.service';
import { StatusItemListComponent }              from '../status-item-list/status-item-list.component';

@Component({
  selector: 'app-layout-tabs',
  templateUrl: './layout-tabs.component.html',
  styleUrls: [ '../globals/styles/_colors.scss', './layout-tabs.component.scss' ],
  encapsulation: ViewEncapsulation.None
})

export class LayoutTabsComponent implements OnInit, OnDestroy {

  layoutPages             :LayoutPage[];
  selectedLayoutPage      :LayoutPage;
  selectedTabIndex        :number = 0;
  statusItemListComponent :StatusItemListComponent;   // Set by app.component
  private subscription    :Subscription;

  constructor(private layoutPageService: LayoutPageService)
  { }

  ngOnInit()
  {
    this.subscription = this.layoutPageService.LayoutPages$.subscribe(data => this.updateLayoutPages(data));
  }

  ngOnDestroy()
  {
    if (this.subscription != null && this.subscription != undefined)
    {
      this.subscription.unsubscribe();
    }
  }

  /*
   * Handler for 'selectedTabChange' event.
   */
  onSelectedTabChanged(pEvent :MatTabChangeEvent)
  {
    console.log(`onSelectedTabChanged(): Begins; pEvent.index='${pEvent.index}'`);
    this.selectedLayoutPage = this.layoutPages[pEvent.index];
    this.updateStatusItemActivePage();
    console.log(`onSelectedTabChanged(): Ends; this.selectedTabIndex = '${this.selectedTabIndex}'`);
  }

  /*
   *  Create a new LayoutPage and insert it into the LayoutPages list.
   */
  addLayoutPage()
  {
    console.log(`LayoutTabsComponent.addNewLayoutPage(): Begins`);
    let newPage :LayoutPage = { id: null, value: 0 };
    let ix = this.layoutPageService.insertLayoutPage(newPage, this.selectedTabIndex);
    console.log(`LayoutTabsComponent.addNewLayoutPage(): Ends: ix = '${ix}`);
  }

  /*
   * Delete the specified LayoutPage from the list.
   */
  deleteLayoutPage()
  {
    console.log(`LayoutTabsComponent.deleteTab(): Begins`);
    this.layoutPageService.deleteLayoutPage(this.selectedLayoutPage.id);
    console.log(`LayoutTabsComponent.deleteTab(): Ends`);
  }

  private updateLayoutPages(pData :LayoutPage[])
  {
    console.log(`LayoutTabsComponent.updateLayoutPages(): Begins; pData.length = '${pData.length}'`);
    this.layoutPages = pData;
    console.log(`LayoutTabsComponent.updateLayoutPages(): this.selectedTabIndex = '${this.selectedTabIndex}'`);
    this.selectedLayoutPage = pData[this.selectedTabIndex];
    this.updateStatusItemActivePage();
    console.log(`LayoutTabsComponent.updateLayoutPages(): Ends; this.selectedLayoutPage.id = '${this.selectedLayoutPage.id}'`);
  }

  /*
   *  Update the StatusItem which displays the current active page ID.
   */
  updateStatusItemActivePage()
  {
    console.log(`LayoutTabsComponent.updateStatusItemActivePage(): Begins`);
    if (this.statusItemListComponent)
    {
      this.statusItemListComponent.updateStatusItem('activePage', `${this.selectedLayoutPage.id}`);
      console.log(`LayoutTabsComponent.updateStatusItemActivePage(): New value = '${this.selectedLayoutPage.id}'`);
    }
    else
      console.log(`LayoutTabsComponent.updateStatusItemActivePage(): this.statusItemListComponent = 'null'`);
    
    console.log(`LayoutTabsComponent.updateStatusItemActivePage(): Ends`);
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
