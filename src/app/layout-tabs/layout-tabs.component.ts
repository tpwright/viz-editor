import { Component, ViewEncapsulation }             from '@angular/core';
import { OnInit, OnDestroy }                        from '@angular/core';
import { MatTabsModule, MatTabChangeEvent }         from '@angular/material/tabs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject }                          from 'rxjs/BehaviorSubject';
import { Observable }                               from 'rxjs/Observable';
import { Subscription }                             from 'rxjs/Subscription';

import { ConfirmDialogComponent }                   from '../confirm-dialog/confirm-dialog.component';
import { LayoutPage }                               from '../models/layout-page';
import { LayoutPageService }                        from '../layout-page.service';
import { StatusItem }                               from '../status-item';
import { StatusItemService }                        from '../status-item.service';

@Component({
  selector: 'app-layout-tabs',
  templateUrl: './layout-tabs.component.html',
  styleUrls: [ '../globals/styles/_colors.scss', './layout-tabs.component.scss' ],
  encapsulation: ViewEncapsulation.None
})

export class LayoutTabsComponent implements OnInit, OnDestroy {

  layoutPages                     :LayoutPage[];
  selectedLayoutPage              :StatusItem = {  key: '_activePage', heading: 'Active Page', value: '' };
  selectedLayoutPageName          :string;
  selectedTabIndex                :number = 0;
  private _subscriptions          :Subscription[] = [];

  constructor( private layoutPageService :LayoutPageService,
               private statusItemService :StatusItemService,
               public dialog :MatDialog, )
  { }

  ngOnInit()
  {
    this._subscriptions.push(this.layoutPageService.layoutPages$.subscribe(data => this.updateLayoutPages(data)));
    this._subscriptions.push(this.statusItemService.statusItems$.subscribe(data => this.updateSelectedPageId(data)));
    this.statusItemService.updateStatusItem(this.selectedLayoutPage);
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
   * Open the confirmation dialog using the
   * supplied title and message.
   * Return: 'true' if the user confirmed the dialog.
   */
  openConfirmDialog(pTitle :string, pMessage :string, pPrompt :string, pConfirmFunction :() => any) :void
  {
    let dialogRef = this.dialog.open(ConfirmDialogComponent,
                                     {
                                      width: '250px',
                                      data: { title:   pTitle,
                                              message: pMessage,
                                              prompt:  pPrompt }
                                     });

    dialogRef.afterClosed().subscribe(result => 
      {
        console.log(`LayoutTabsComponent.openDialog.dialogRef.afterClosed(): result = '${result}'`);
        if (result == true)
        {
          if (pConfirmFunction)
            pConfirmFunction();
          else
            console.log(`LayoutTabsComponent.openDialog.dialogRef.afterClosed(): pConfirmFunction is missing!`);
        }
      });
  }

  /*
   * Handler for 'selectedTabChange' event.
   */
  public onSelectedTabChanged(pEvent :MatTabChangeEvent)
  {
    console.log(`onSelectedTabChanged(): Begins; pEvent.index='${pEvent.index}'`);

    this.selectedLayoutPageName = this.layoutPages[pEvent.index].name;
    this.selectedLayoutPage.value = this.layoutPages[pEvent.index].name;
    this.statusItemService.updateStatusItem(this.selectedLayoutPage);

    console.log(`onSelectedTabChanged(): Ends; this.selectedTabIndex = '${this.selectedTabIndex}'`);
  }

  /*
   *  Create a new LayoutPage and insert it into the LayoutPages list.
   */
  public addLayoutPage()
  {
    console.log(`LayoutTabsComponent.addNewLayoutPage(): Begins`);
    let newPage = new LayoutPage(null, 850, 1000, 6);
    let ix = this.layoutPageService.insertLayoutPage(newPage, this.selectedTabIndex);
    console.log(`LayoutTabsComponent.addNewLayoutPage(): Ends: ix = '${ix}`);
  }

  /*
   * Delete the specified LayoutPage from the list.
   */
  public deleteLayoutPage()
  {
    console.log(`LayoutTabsComponent.deleteLayoutPage(): Begins`);
    if (confirm(`Permanently delete all data for Layout Page '${this.selectedLayoutPageName}'?`))
    {
      this.layoutPageService.deleteLayoutPage(this.selectedLayoutPageName);
      console.log(`LayoutTabsComponent.deleteLayoutPage(): LayoutPage deleted!`);
    }
    console.log(`LayoutTabsComponent.deleteLayoutPage(): Ends`);
  }

  private updateLayoutPages(pData :LayoutPage[])
  {
    console.log(`LayoutTabsComponent.updateLayoutPages(): Begins; pData.length = '${pData.length}'`);
    this.layoutPages = pData;

    console.log(`LayoutTabsComponent.updateLayoutPages(): this.selectedTabIndex = '${this.selectedTabIndex}'`);
    this.selectedLayoutPage.value = pData[this.selectedTabIndex].name.toString();
    this.statusItemService.updateStatusItem(this.selectedLayoutPage);

    console.log(`LayoutTabsComponent.updateLayoutPages(): Ends`);
  }

  private updateSelectedPageId(pData :StatusItem[])
  {
    let ix = pData.findIndex(item => item.key == this.selectedLayoutPage.key);
    if (ix >= 0)
    {
      this.selectedLayoutPageName = pData[ix].value;
    }
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
