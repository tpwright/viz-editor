import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StatusItem }                           from '../status-item';

@Component({
  selector: 'app-status-item-list',
  templateUrl: './status-item-list.component.html',
  styleUrls: ['./status-item-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StatusItemListComponent implements OnInit {
  statusItems: StatusItem[] = [
    { key: 'user', heading: 'User', value: 'Tom' },
    { key: 'date', heading: 'Date', value: '11/13/2017'}
  ];
  
  constructor() { }

  ngOnInit() { }

  /*
   * Retrieve the StatusItem whose key matches
   * the specified value.
   */
  getStatusItemByKey(pKey: string): StatusItem {
    function findByKey(pItem) {
      return (pItem.key == pKey);
    }

    return this.statusItems.find(findByKey);
  }
}
