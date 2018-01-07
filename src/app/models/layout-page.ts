import { Widget }       from './widget';

/*
 *  Represents a single layout page.
 */
export class LayoutPage
{
    public name    :string;     // Page name: assumed to be unique among Layout Pages
    public height  :number;     // Height: pixels
    public width   :number;     // Width: pixels
    public scale   :number;     // Scale: inches/pixel
    public widgets :Widget[];   // Widgets collection for the page

    constructor( pName    :string,
                 pHeight  :number,
                 pWidth   :number,
                 pScale   :number,
                 pWidgets :Widget[] = [] )
    {
        this.name    = pName;
        this.height  = pHeight;
        this.width   = pWidth;
        this.scale   = pScale;
        this.widgets = pWidgets;
    }

    /*
     *  Return an exact duplicate of this LayoutPage instance.
     */
    clone() :LayoutPage
    {
        let data = JSON.parse(JSON.stringify(this));
        let duplicate = new LayoutPage(data.id, data.height, data.height, data.widgets);
        return duplicate;
    }

    /*
     *  Return 'true' IFF the two instances have equal values for all properties.
     */
    isIdentical(pLayoutPage :LayoutPage) :Boolean
    {
        return (JSON.stringify(this) == JSON.stringify(pLayoutPage));
    }
}
