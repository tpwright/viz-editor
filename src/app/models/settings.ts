export class Settings
{
    public defPageHeight        :number;    // Default Layout Page height: pixels
    public defPageWidth         :number;    // Default Layout Page width: pixels
    public defScale             :number;    // Default equipment scale: px/inch
    public defConveyorWidthIn   :number;    // Default conveyor width: inches

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

    /*
     *  Provide an iterable list of the setting names and their values.
     */
    public getSettingsList() :{name :string, value :string|number|boolean}[]
    {
        let sa :{name :string, value :string|number|boolean}[] = [];
        sa.push({name: "defPageHeight",      value: this.defPageHeight});
        sa.push({name: "defPageWidth",       value: this.defPageWidth});
        sa.push({name: "defScale",           value: this.defScale});
        sa.push({name: "defConveyorWidthIn", value: this.defConveyorWidthIn});
        return sa;
    }

    /*
     *  Apply the values contained in the provided list of setting names/values
     *  to the current settings.
     */
    public applySettingsList(pSettingsList :{name :string, value :string|number|boolean}[]) :void
    {
        pSettingsList.forEach(setting =>
            {
                switch (setting.name)
                {
                    case 'defPageHeight':
                        this.defPageHeight = setting.value as number;
                        break;

                    case 'defPageWidth':
                        this.defPageWidth = setting.value as number;
                        break;
                        
                    case 'defScale':
                        this.defScale = setting.value as number;
                        break;
                        
                    case 'defConveyorWidthIn':
                        this.defConveyorWidthIn = setting.value as number;
                        break;
                }
            });
    }
}
