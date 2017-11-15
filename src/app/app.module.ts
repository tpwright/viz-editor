import { BrowserModule }            from '@angular/platform-browser';
import { NgModule }                 from '@angular/core';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { MatTabsModule }            from '@angular/material';
import { MatIconModule }            from '@angular/material/icon';

import { AppComponent }             from './app.component';
import { MenuComponent }            from './menu/menu.component';
import { LayoutTabsComponent }      from './layout-tabs/layout-tabs.component';
import { StatusItemListComponent }  from './status-item-list/status-item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LayoutTabsComponent,
    StatusItemListComponent,
  ],
  imports: [
    BrowserModule,            // The order of these imports is critical
    MatTabsModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
