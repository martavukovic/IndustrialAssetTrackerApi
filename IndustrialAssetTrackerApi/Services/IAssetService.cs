using IndustrialAssetTrackerApi.Models;

namespace IndustrialAssetTrackerApi.Services
{
    public interface IAssetService
    {
        // 1. Obećajemo da ćemo moći dohvatiti sve strojeve
        Task<List<Asset>> GetAllAssets();

        // 2. Obećajemo da ćemo moći dohvatiti jedan stroj po ID-u
        // Upitnik (Asset?) znači da stroj možda ne postoji (vratit će null)
        Task<Asset?> GetSingleAsset(int id);

        // 3. Obećajemo da ćemo moći dodati novi stroj
        Task<List<Asset>> AddAsset(Asset asset);

        // 4. Obećajemo da ćemo moći ažurirati postojeći stroj
        Task<List<Asset>?> UpdateAsset(int id, Asset request);

        // 5. Obećajemo da ćemo moći obrisati stroj
        Task<List<Asset>?> DeleteAsset(int id);
    }
}
