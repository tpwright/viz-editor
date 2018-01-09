import { Component, ViewEncapsulation }     from '@angular/core';
import { OnInit, OnDestroy }                from '@angular/core';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription }                     from 'rxjs/Subscription';

import { ConfirmDialogComponent }           from '../confirm-dialog/confirm-dialog.component';
import { LayoutPage }                       from '../models/layout-page';
import { LayoutPageService }                from '../layout-page.service';
import { Settings }                         from '../models/settings';
import { SettingsService }                  from '../settings.service';
import { StatusItem }                       from '../status-item';
import { StatusItemService }                from '../status-item.service';

@Component({
  selector: 'app-layout-tabs',
  templateUrl: './layout-tabs.component.html',
  styleUrls: [ '../globals/styles/_colors.scss', './layout-tabs.component.scss' ],
  encapsulation: ViewEncapsulation.None
})

export class LayoutTabsComponent implements OnInit, OnDestroy {

  private _siSelectedLayoutPage   :StatusItem = { key: '_activePage', heading: 'Active Page', value: '' };
  private _siSvgSize              :StatusItem = { key: '_svgSize',    heading: 'SVG Size',    value: '' };
  private _settings               :Settings;
  private _subscriptions          :Subscription[] = [];
  public  layoutPages             :LayoutPage[];
  public  selectedTabIndex        :number = 0;

  constructor( private _layoutPageService :LayoutPageService,
               private _settingsService   :SettingsService,
               private _statusItemService :StatusItemService )
  { }

  ngOnInit()
  {
    console.log(`LayoutTabsComponent.ngOnInit(): Begins`);
    this.initFirstLayoutPage();
    this._subscriptions.push(this._layoutPageService.layoutPages$.subscribe(data => this.updateLayoutPages(data)));
    this._subscriptions.push(this._settingsService.settings$.subscribe(data =>this.updateSettings(data)));
    this._statusItemService.updateStatusItem(this._siSelectedLayoutPage);
    this._statusItemService.updateStatusItem(this._siSvgSize);
    console.log(`LayoutTabsComponent.ngOnInit(): Ends`);
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
   * Handler for 'selectedTabChange' event.
   */
  public onSelectedTabChanged(pEvent :MatTabChangeEvent)
  {
    console.log(`onSelectedTabChanged(): Begins; pEvent.index='${pEvent.index}'`);

    this._siSelectedLayoutPage.value = this.layoutPages[pEvent.index].name;
    this._statusItemService.updateStatusItem(this._siSelectedLayoutPage);

    this._siSvgSize.value = `${this.layoutPages[pEvent.index].height}h x ${this.layoutPages[pEvent.index].width}w`;
    this._statusItemService.updateStatusItem(this._siSvgSize);

    console.log(`onSelectedTabChanged(): Ends; this.selectedTabIndex = '${this.selectedTabIndex}'`);
  }

  /*
   *  Create a new LayoutPage and insert it into the LayoutPages list.
   */
  public addLayoutPage()
  {
    console.log(`LayoutTabsComponent.addNewLayoutPage(): Begins`);
    let newPage = new LayoutPage(null, 850, 1000, 6);
    let ix = this._layoutPageService.insertLayoutPage(newPage, this.selectedTabIndex);
    console.log(`LayoutTabsComponent.addNewLayoutPage(): Ends: ix = '${ix}`);
  }

  /*
   * Delete the specified LayoutPage from the list.
   */
  public deleteLayoutPage()
  {
    console.log(`LayoutTabsComponent.deleteLayoutPage(): Begins`);
    if (confirm(`Permanently delete all data for Layout Page '${this._siSelectedLayoutPage.value}'?`))
    {
      this._layoutPageService.deleteLayoutPage(this._siSelectedLayoutPage.value);
      console.log(`LayoutTabsComponent.deleteLayoutPage(): LayoutPage deleted!`);
    }
    console.log(`LayoutTabsComponent.deleteLayoutPage(): Ends`);
  }

  /*
   *  Initialize an empty LayoutPage
   */
  private initFirstLayoutPage()
  {
    console.log(`LayoutPageService.initFirstLayoutPage(): Begins`);

    let newData :LayoutPage[] = [];

    // Ensure we have some settings
    this._settings = this._settingsService.getSettings();

    let test = true;

    if (test)
    {
      // Create some pages for testing
      for (let i = 1; i <= 4; i++)
      {
        let newPage = new LayoutPage(null, this._settings.defPageHeight,
                                           this._settings.defPageWidth,
                                           this._settings.defScale);
        newData.push(newPage);
      }
    }
    else
    {
      let newPage = new LayoutPage('<new>', this._settings.defPageHeight,
                                            this._settings.defPageWidth,
                                            this._settings.defScale);
        newData.push(newPage);
    }

    this._layoutPageService.replaceAllLayoutPages(newData);

    console.log(`LayoutPageService.initFirstLayoutPage(): Ends; newData.length = '${newData.length}'`);
  }

  /*
   *  The function that updates our collection of LayoutPage items
   *  whenever we receive a new value of that collection.
   */
  private updateLayoutPages(pData :LayoutPage[])
  {
    if (pData)
    {
      console.log(`LayoutTabsComponent.updateLayoutPages(): Begins; pData.length = '${pData.length}'`);
    
      this.layoutPages = pData;
      if (pData.length > 0)
      {
        this._siSelectedLayoutPage.value = pData[this.selectedTabIndex].name.toString();
        this._siSvgSize.value = `${pData[this.selectedTabIndex].height}h x ${pData[this.selectedTabIndex].width}w`;
      }
      else
      {
        this._siSelectedLayoutPage.value = null;
        this._siSvgSize.value = null;
      }

      this._statusItemService.updateStatusItem(this._siSelectedLayoutPage);
      this._statusItemService.updateStatusItem(this._siSvgSize);
    }
    else
    {
      console.log(`LayoutTabsComponent.updateLayoutPages(): Begins; pData is undefined`);
    }

    console.log(`LayoutTabsComponent.updateLayoutPages(): Ends`);
  }

  private updateSettings(pData :Settings)
  {
    console.log(`LayoutTabsComponent.updateSettings(): Begins; pData ='${pData}'`)
    this._settings = pData;
    console.log(`LayoutTabsComponent.updateSettings(): Ends`)
  }

  /*
   * Activate the next/previous tab, wrapping
   * when beginning/end of list is reached.
   *  pStep < 0: go to previous tab.
   *  pstep > 0: go to next tab.
 */
  public stepToTab(pStep :number)
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
  public goToTab(pStep :number)
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
