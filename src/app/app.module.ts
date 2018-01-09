import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { MatTabsModule }            from '@angular/material/tabs';
import { MatIconModule }            from '@angular/material/icon';
import { MatMenuModule }            from '@angular/material/menu';
import { MatToolbarModule }         from '@angular/material/toolbar';
import { MatListModule }            from '@angular/material/list';
import { MatDialogModule }          from '@angular/material';
import { NgModule }                 from '@angular/core';

import { CookieModule }             from 'ngx-cookie';

import { AppComponent }             from './app.component';
import { ConfirmDialogComponent }   from './confirm-dialog/confirm-dialog.component';
import { EditSettingsComponent } from './edit-settings/edit-settings.component';
import { LayoutPageService }        from './layout-page.service';
import { LayoutTabsComponent }      from './layout-tabs/layout-tabs.component';
import { MenuComponent }            from './menu/menu.component';
import { SettingsService }          from './settings.service';
import { StatusItemListComponent }  from './status-item-list/status-item-list.component';
import { StatusItemService }        from './status-item.service';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    MenuComponent,
    LayoutTabsComponent,
    StatusItemListComponent,
    EditSettingsComponent,
  ],
  imports: [
    BrowserModule,            // The order of this and MatTabsModule is critical
    MatTabsModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    MatMenuModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [
    LayoutPageService,
    SettingsService,
    StatusItemService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
