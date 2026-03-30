using IndustrialAssetTrackerApi.Application.Dtos.Assets;
using IndustrialAssetTrackerApi.Core.Entities;

namespace IndustrialAssetTrackerApi.Application.Services.Assets
{
    public interface IAssetService
    {
        Task<List<GetAssetDto>> GetAllAssets();
        Task<GetAssetDto?> GetSingleAsset(int id);
        Task<GetAssetDto> AddAsset(CreateAsset asset);
        Task<bool> UpdateAsset(int id, UpdateAsset asset);
        Task<bool> DeleteAsset(int id);
    }
}