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
import { EditPropertiesComponent }  from './edit-properties/edit-properties.component';
import { LayoutPageService }        from './layout-page.service';
import { LayoutTabsComponent }      from './layout-tabs/layout-tabs.component';
import { MatFormFieldModule }       from '@angular/material/form-field';
import { MatInputModule}            from '@angular/material/input';
import { MenuComponent }            from './menu/menu.component';
import { SettingsService }          from './settings.service';
import { StatusItemListComponent }  from './status-item-list/status-item-list.component';
import { StatusItemService }        from './status-item.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LayoutTabsComponent,
    StatusItemListComponent,
    EditPropertiesComponent,
  ],
  imports: [
    BrowserModule,            // The order of this and MatTabsModule is critical
    MatTabsModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    
  ],
  entryComponents: [
    EditPropertiesComponent
  ],
  providers: [
    LayoutPageService,
    SettingsService,
    StatusItemService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
