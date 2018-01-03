import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit, OnDestroy }            from '@angular/core/src/metadata/lifecycle_hooks';
import { AfterViewInit }                from '@angular/core';
import { Subscription }                 from 'rxjs/Subscription';

import { LayoutTabsComponent }          from '../layout-tabs/layout-tabs.component';
import { StatusItem }                   from '../status-item';
import { StatusItemService }            from '../status-item.service';

@Component({
  selector: 'app-status-item-list',
  templateUrl: './status-item-list.component.html',
  styleUrls: [ '../globals/styles/_colors.scss', './status-item-list.component.scss' ],
  encapsulation: ViewEncapsulation.None
})

export class StatusItemListComponent implements OnInit, OnDestroy {

  statusItems :StatusItem[] = [];

  currentDate             :string;
  currentTime             :string;
  selectedLayoutPageId    :number;
  private _intervalId1    :number;
  private _subscriptions  :Subscription[] = [];

  constructor( private statusItemService :StatusItemService )
  { }

  ngOnInit()
  {
    /*
     * Update the date/time display every second
     */
    this._intervalId1 = window.setInterval(() =>
      {
        const locale = "en-US";
        let today = new Date();
        this.currentDate = today.toLocaleDateString(locale);
        this.currentTime = today.toLocaleTimeString(locale);
      },
      1000);

      /*
      *  Subscribe to the data we are to display.
      */
      this._subscriptions.push(this.statusItemService.statusItems$
              .subscribe(data => this.statusItems = data));
  }

  ngOnDestroy()
  {
    if (this._intervalId1)
    {
      clearInterval(this._intervalId1);
    }

    let sub :Subscription;

    while (sub = this._subscriptions.pop())
    {
      sub.unsubscribe();
    }
  }

  /*
   * Retrieve the StatusItem whose key matches
   * the specified value.
   */
  getStatusItemByKey(pKey :string): StatusItem
  {
    function findByKey(pItem)
    {
      return (pItem.key == pKey);
    }

    return this.statusItems.find(findByKey);
  }

  /*
   *  Set the value of the StatusItem whose key
   *  equals pKey to the value of pValue.
   */
  updateStatusItem(pKey :string, pValue :string)
  {
    let item :StatusItem;
    if (item = this.getStatusItemByKey(pKey))
    {
      item.value = pValue;
    }
  }
}
