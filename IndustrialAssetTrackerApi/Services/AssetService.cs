using IndustrialAssetTrackerApi.Data;
using IndustrialAssetTrackerApi.Dtos;
using IndustrialAssetTrackerApi.Models;
using Microsoft.EntityFrameworkCore;

namespace IndustrialAssetTrackerApi.Services
{
    public class AssetService(AppDbContext context) : IAssetService
    {
        // POPRAVLJENO: Dodan async i promijenjen povratni tip u List da prati interface
        public async Task<List<GetAssetDto>> AddAsset(Asset asset)
        {
            throw new NotImplementedException();
        }

        // POPRAVLJENO: Dodan async
        public async Task<List<GetAssetDto>?> DeleteAsset(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<GetAssetDto>> GetAllAssets()
            => await context.Assets.Select(a => new GetAssetDto
            {
                Name = a.Name,
                Type = a.Type,
                Location = a.Location,
                IsActive = a.IsActive
            }).ToListAsync();

        public async Task<GetAssetDto?> GetSingleAsset(int id)
        {
            var result = await context.Assets
                .Where(a => a.Id == id)
                .Select(a => new GetAssetDto
                {
                    Name = a.Name,
                    Type = a.Type,
                    Location = a.Location,
                    IsActive = a.IsActive
                }).FirstOrDefaultAsync();

            return result;
        }

        // POPRAVLJENO: Dodan async
        public async Task<List<GetAssetDto>?> UpdateAsset(int id, Asset request)
        {
            throw new NotImplementedException();
        }
    }
}