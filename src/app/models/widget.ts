export abstract class Widget
{
    public isSelected :boolean;
    public isModified :boolean;
    public length     :number;          // Length: pixels
    public rotation   :number;          // Rotation angle: degrees, clockwise from noon
    public scale      :number;          // Scale: inches/pixel
    public width      :number;          // Width: pixels
    public unitId     :string;          // The unique unit ID
    public readonly typeName :string;   // The equipment type
    
    constructor( pTypeName :string,
                 pLength   :number,
                 pWidth    :number,
                 pRotation :number,
                 pScale    :number )
    {
        this.typeName = pTypeName;
        this.length   = pLength;
        this.width    = pWidth;
        this.rotation = pRotation;
        this.scale    = pScale;
    }

    public isIdentical(pWidget :Widget) :boolean
    {
        return (JSON.stringify(this) == JSON.stringify(pWidget));
    }

    /*
     *  This method creates the <SVG> element that represents the
     *  equipment unit. This element may either be a <path> or a
     *  <g> (group) containing multiple elements that visualizes
     *  the equipment unit and has its 'id' attribute set to the
     *  widget's 'unitId' which is assumed to be unique.
     * 
     *  N.B.: The default line color has been applied;
     *        the background color HAS NOT.
     */
    abstract renderAsPath() :HTMLElement;

    /*
     *  This method recalculates the length and width for the
     *  widget, based on the current values (in pixels) and
     *  the previous and new 'scale' values.
     */
    public setScale(pNewScale :number) :void
    {
        if (!pNewScale || pNewScale == 0) return;
        if (this.scale != 0)
        {
            // Convert from px ==> inches
            let inchesL = this.length * this.scale;
            let inchesW = this.width  * this.scale;

            // Convert from inches ==> px
            this.length = inchesL / pNewScale;
            this.width  = inchesW / pNewScale;
        }

        this.scale = pNewScale;
    }
}
