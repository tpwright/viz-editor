/*
 * Represents a single entry in a hierarchical menu.
 * 
 * A null 'label' property identifies the MenuItem's 'submenu' as a top-level menu's entries.
 * 
 * A null 'submenu' property indicates a bottom-level menu entry whose 'command' is activated
 * when the entry is selected.
 */
export interface MenuItem {
    id: string;
    label: string;
    submenu: MenuItem[];
}
