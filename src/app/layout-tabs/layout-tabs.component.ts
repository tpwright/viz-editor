import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutPage }                           from '../layout-page'

@Component({
  selector: 'app-layout-tabs',
  templateUrl: './layout-tabs.component.html',
  styleUrls: ['./layout-tabs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutTabsComponent implements OnInit {

  layoutPages: LayoutPage[] = [
    { id: 'Tab 1' },
    { id: 'Tab 2' },
    { id: 'Tab 3' },
    { id: 'Tab 4' },
    { id: 'Tab 5' },   
  ]

  constructor() { }

  ngOnInit() {
  }
}
