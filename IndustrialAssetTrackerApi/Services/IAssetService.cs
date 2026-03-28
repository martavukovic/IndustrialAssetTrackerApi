using IndustrialAssetTrackerApi.Dtos;
using IndustrialAssetTrackerApi.Models;

namespace IndustrialAssetTrackerApi.Services
{
    public interface IAssetService
    {
        // 1. Dohvaćanje svih
        Task<List<GetAssetDto>> GetAllAssets();

        // 2. Dohvaćanje jednog (Maknula sam komentare //)
        Task<GetAssetDto?> GetSingleAsset(int id);

        // 3. Dodavanje (Mora vraćati Listu ako tako želiš u servisu)
        Task<List<GetAssetDto>> AddAsset(Asset asset);

        // 4. Ažuriranje
        Task<List<GetAssetDto>?> UpdateAsset(int id, Asset request);

        // 5. Brisanje (Dodala sam GetAssetDto unutar zagrada)
        Task<List<GetAssetDto>?> DeleteAsset(int id);
    }
}