import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit, OnDestroy }            from '@angular/core/src/metadata/lifecycle_hooks';
import { StatusItem }                   from '../status-item';

@Component({
  selector: 'app-status-item-list',
  templateUrl: './status-item-list.component.html',
  styleUrls: [ '../globals/styles/_colors.scss', './status-item-list.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class StatusItemListComponent implements OnInit, OnDestroy {
  statusItems: StatusItem[] = [
    { key: 'activePage', heading: 'Active Page', value: '' },
  ];

  currentDate :string;
  currentTime :string;
  intervalId  :number = 0;
  
  constructor() { }

  ngOnInit()
  {
    /*
     * Update the date/time display every second
     */
    this.intervalId = window.setInterval(
      () => {
              let today = new Date();
              this.currentDate = today.toLocaleDateString("en-US");
              this.currentTime = today.toLocaleTimeString("en-US");
            },
      1000);
  }

  ngOnDestroy()
  {
    clearInterval(this.intervalId);
  }

  /*
   * Retrieve the StatusItem whose key matches
   * the specified value.
   */
  getStatusItemByKey(pKey: string): StatusItem
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
  updateStatusItem(pKey :string, pValue : string)
  {
    let item :StatusItem;
    if (item = this.getStatusItemByKey(pKey))
    {
      item.value = pValue;
    }
  }
}
