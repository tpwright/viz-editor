import { Component }                  from '@angular/core';
import { AfterViewInit, ViewChild }   from '@angular/core';
import { HostListener }               from '@angular/core';
import { LayoutTabsComponent }        from './layout-tabs/layout-tabs.component';
import { MenuComponent }              from './menu/menu.component';
import { StatusItemListComponent }    from './status-item-list/status-item-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './globals/styles/_colors.scss', './app.component.scss' ]
})

export class AppComponent implements AfterViewInit {
  title = 'Visualization Editor';

  @ViewChild(LayoutTabsComponent)
  private layoutTabsComponent: LayoutTabsComponent;

  @ViewChild(MenuComponent)
  private menuComponent: MenuComponent;

  @ViewChild(StatusItemListComponent)
  private statusItemListComponent: StatusItemListComponent;
 
  ngAfterViewInit()
  {
    this.menuComponent.layoutTabsComponent = this.layoutTabsComponent;
    if (this.statusItemListComponent === null || this.statusItemListComponent === undefined)
      console.log('app.component.ngAfterViewInit(): this.statusItemListComponent is not defined!!!')
    this.layoutTabsComponent.statusItemListComponent = this.statusItemListComponent;
  }

  @HostListener('document:keydown', ['$event'])
  checkForHotKey(pEvent: KeyboardEvent)
  {
    console.log("keydown event: char='"     + pEvent.char     + "', " +
                               "key='"      + pEvent.key      + "', " +
                               "ctrlKey='"  + pEvent.ctrlKey  + "', " +
                               "altKey='"   + pEvent.altKey   + "', " +
                               "shiftKey='" + pEvent.shiftKey + "'");
    if (pEvent.cancelable)
    {
      pEvent.preventDefault();
    }
  }
}
