namespace IndustrialAssetTrackerApi.Dtos
{
    public class GetAssetDto
    {
        //public int Id { get; set; }
        public string Name { get; set; } = string.Empty; // npr. "Senzor Tlaka 01"
        public string Type { get; set; } = string.Empty; // npr. "Senzor", "Pumpa", "Motor"
        public string Location { get; set; } = string.Empty; // npr. "Pogon A"
        public bool IsActive { get; set; } = true; // Je li stroj u radu?
    }
}
