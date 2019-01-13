namespace Project_Bier.Models
{
    /// <summary>
    /// Data model class for Beer
    /// </summary>
    public class Beer : Product
    {
        public string CategoryId { get; set; }
        public string Content { get; set; }
        public string AlcoholPercentage { get; set; }
        public string BrewerName { get; set; }
        public string CountryName { get; set; }
        public string ServingTemperature { get; set; }
        public string ServingGlass { get; set; }
        public string BeerColourHex { get; set; }
    }
}