import { Component, ViewEncapsulation }   from '@angular/core';
import { LayoutPage }                     from '../layout-page';
import { LayoutTabsComponent }            from '../layout-tabs/layout-tabs.component';
import { MenuItem }                       from '../menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ '../globals/styles/_colors.scss', './menu.component.scss' ],
  encapsulation: ViewEncapsulation.None
})

export class MenuComponent {

  alignMenu: MenuItem[] = [
    { id: 'alignMenu_Left',     label: 'Left',      children: null },
    { id: 'alignMenu_Center',   label: 'Center',    children: null },
    { id: 'alignMenu_Right',    label: 'Right',     children: null },
    { id: 'alignMenu_-1',       label: '-',         children: null },
    { id: 'alignMenu_Top',      label: 'Top',       children: null },
    { id: 'alignMenu_Middle',   label: 'Middle',    children: null },
    { id: 'alignMenu_Bottom',   label: 'Bottom',    children: null },
  ];

  widgetMenu: MenuItem[] = [
    { id: 'widgetMenu_RolrStr', label: 'Roller Conveyor, Straight', children: null },
    { id: 'widgetMenu_RolrCur', label: 'Roller Conveyor, Curved',   children: null },
    { id: 'widgetMenu_-1',      label: '-',                         children: null },
    { id: 'widgetMenu_BeltStr', label: 'Belt Conveyor, Straight',   children: null },
    { id: 'widgetMenu_BeltCur', label: 'Belt Conveyor, Curved',     children: null },
  ];

  helpMenu: MenuItem[] = [
    { id: 'helpMenu_About',     label: 'About',     children: null },
  ];

  actionsMenu: MenuItem[] = [
    { id: 'actionsMenu_Rotate', label: 'Rotate',    children: null },
    { id: 'actionsMenu_Grow',   label: 'Grow',      children: null },
    { id: 'actionsMenu_Shrink', label: 'Shrink',    children: null },
    { id: 'actionsMenu_Align',  label: 'Align',     children: this.alignMenu },
  ];

  insertMenu: MenuItem[] = [
    { id: 'insertMenu_Page',    label: 'Page',      children: null, },
    { id: 'insertMenu_Widget',  label: 'Widget',    children: this.widgetMenu },
  ];

  editMenu: MenuItem[] = [
    { id: 'editMenu_Copy',      label: 'Copy',      children: null },
    { id: 'editMenu_Paste',     label: 'Paste',     children: null },
    { id: 'editMenu_Cut',       label: 'Cut',       children: null },
    { id: 'editMenu_Delete',    label: 'Delete',    children: null },
  ];

  fileMenu: MenuItem[] = [
    { id: 'fileMenu_New',       label: 'New',       children: null },
    { id: 'fileMenu_Save',      label: 'Save',      children: null },
    { id: 'fileMenu_SaveAs',    label: 'Save As',   children: null },
    { id: 'fileMenu_-1',        label: '-',         children: null },
    { id: 'fileMenu_Import',    label: 'Import',    children: null },
    { id: 'fileMenu_Export',    label: 'Export',    children: null },
    { id: 'fileMenu_-2',        label: '-',         children: null },
    { id: 'fileMenu_Exit',      label: 'Exit',      children: null },
  ];

  mainMenu: MenuItem[] = [
    { id: 'mainMenu_File',      label: 'File',      children: this.fileMenu },
    { id: 'mainMenu_Edit',      label: 'Edit',      children: this.editMenu },
    { id: 'mainMenu_Insert',    label: 'Insert',    children: this.insertMenu },
    { id: 'mainMenu_Actions',   label: 'Actions',   children: this.actionsMenu },
    { id: 'mainMenu_Settings',  label: 'Settings',  children: null, },
    { id: 'mainMenu_Help',      label: 'Help',      children: this.helpMenu },
    { id: 'mainMenu_NewPage',   label: 'New Layout Page', children: null },
    { id: 'mainMenu_TabPrev',   label: 'Prev Tab',        children: null },
    { id: 'mainMenu_TabNext',   label: 'Next Tab',        children: null },
  ];

  layoutTabsComponent :LayoutTabsComponent;   // Set by app.component

  constructor() { }

  /*
   * Call the appropriate function for the selected menu item.
   */
   private menuDispatch(pMenuItem: MenuItem)
  {
    console.log("menuDispatch(): pMenuItem.label='" + pMenuItem.label +  "'")
    switch (pMenuItem.id)
    {
      case "mainMenu_NewPage":
        this.layoutTabsComponent.addLayoutPage();
        break;

      case "mainMenu_TabPrev":
        this.layoutTabsComponent.stepToTab(-1);
        break;

      case "mainMenu_TabNext":
        this.layoutTabsComponent.stepToTab(1);
        break;
    }
  }
}
