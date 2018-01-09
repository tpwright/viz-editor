export class Settings
{
    public defPageHeight :number;       // Default Layout Page height: pixels
    public defPageWidth  :number;       // Default Layout Page width: pixels
    public defScale      :number;       // Default equipment scale: px/inch

    constructor ( pDefPageHeight :number = 600,
                  pDefPageWidth  :number = 1200,
                  pDefScale      :number = 3 )
    {
        this.defPageHeight = pDefPageHeight;
        this.defPageWidth  = pDefPageWidth;
        this.defScale      = pDefScale;
    }
}
