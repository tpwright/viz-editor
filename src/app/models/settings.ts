export class Settings
{
    public defPageHeight :number;       // Default Layout Page height: pixels
    public defPageWidth  :number;       // Default Layout Page width: pixels
    public defScale      :number;       // Default equipment scale: px/inch
    public lastDataPath  :string;       // Pathname of the last-saved data file

    constructor ( pDefPageHeight :number = 850,
                  pDefPageWidth  :number = 1000,
                  pDefScale      :number = 2,
                  pLastDataPath  :string = null )
    {
        this.defPageHeight = pDefPageHeight;
        this.defPageWidth  = pDefPageWidth;
        this.defScale      = pDefScale;
        this.lastDataPath  = pLastDataPath;
    }
}
