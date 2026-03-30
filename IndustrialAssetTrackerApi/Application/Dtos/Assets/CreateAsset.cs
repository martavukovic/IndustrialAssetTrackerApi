namespace IndustrialAssetTrackerApi.Application.Dtos.Assets
{
    public class CreateAsset
    {
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string IsActive { get; set; } = string.Empty;

    }
}
