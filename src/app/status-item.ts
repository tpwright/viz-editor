/*
 * Represents a single entry in the StatusItemList, used to populate the status bar.
 * 
 * 'key' is used to specify which entry's reference for getStatusItemByKey() to return.
 * 
 * 'heading' is the text that appears on the top line of the displayed entry.
 * 
 * 'value' is the text that appears on the bottom line of the displayed entry.
 */
export interface StatusItem {
    key:        string;
    heading:    string;
    value:      string;
}
