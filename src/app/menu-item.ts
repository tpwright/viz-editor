/*
 * Represents a single entry in a hierarchical menu.
 * 
 * A null 'label' property identifies the MenuItem's children as a top-level menu's entries.
 * 
 * A null 'children' property indicates a bottom-level menu entry whose 'command' is activated
 * when the entry is selected.
 */
export interface MenuItem {
    id: string;
    label: string;
    children: MenuItem[];
}
