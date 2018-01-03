import { Component }                  from '@angular/core';
import { AfterViewInit, ViewChild }   from '@angular/core';
import { HostListener }               from '@angular/core';
import { LayoutTabsComponent }        from './layout-tabs/layout-tabs.component';
import { MenuComponent }              from './menu/menu.component';

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
 
  ngAfterViewInit()
  {
    this.menuComponent.layoutTabsComponent = this.layoutTabsComponent;
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
