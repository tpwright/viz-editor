import { IEditListClass }       from '../interfaces/i-edit-list-class';

export class Settings implements IEditListClass
{
    public defPageHeight        :number;    // Default Layout Page height: pixels
    public defPageWidth         :number;    // Default Layout Page width: pixels
    public defScale             :number;    // Default equipment scale: px/inch
    public defConveyorWidthIn   :number;    // Default conveyor width: inches

    private _deployableProperties = [ { name: 'defPageHeight',      isEditable: true },
                                      { name: 'defPageWidth',       isEditable: true },
                                      { name: 'defScale',           isEditable: true },
                                      { name: 'defConveyorWidthIn', isEditable: true },
                                    ];

    constructor ( pDefPageHeight      :number = 600,
                  pDefPageWidth       :number = 1200,
                  pDefScale           :number = 3,
                  pDefConveyorWidthIn :number = 24
                )
    {
        this.defPageHeight      = pDefPageHeight;
        this.defPageWidth       = pDefPageWidth;
        this.defScale           = pDefScale;
        this.defConveyorWidthIn = pDefConveyorWidthIn
    }

    public getDisplayableProperties() :{ name :string, isEditable :boolean }[]
    {
        return this._deployableProperties;
    }
}
