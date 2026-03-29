using IndustrialAssetTrackerApi.Data;
using IndustrialAssetTrackerApi.Dtos;
using IndustrialAssetTrackerApi.Models;
using Microsoft.EntityFrameworkCore;

namespace IndustrialAssetTrackerApi.Services
{
    public class AssetService(AppDbContext context) : IAssetService
    {
        public async Task<GetAssetDto> AddAsset(CreateAsset asset)
        {
            var getAsset = new Asset
            {
                Name = asset.Name,
                Type = asset.Type,
                Location = asset.Location,
                IsActive = bool.Parse(asset.IsActive)
            };

            context.Assets.Add(getAsset);
            await context.SaveChangesAsync();

            return new GetAssetDto
            {
                Id = getAsset.Id,
                Name = getAsset.Name,
                Type = getAsset.Type,
                Location = getAsset.Location,
                IsActive = getAsset.IsActive
            };
        }

        public async Task<bool> DeleteAsset(int id)
        {
            var assetToDelete = await context.Assets.FindAsync(id);

            if (assetToDelete is null)
                return false;

            context.Assets.Remove(assetToDelete);
            await context.SaveChangesAsync();

            return true;
        }

        public async Task<List<GetAssetDto>> GetAllAssets()
            => await context.Assets.Select(a => new GetAssetDto
            {
                Id = a.Id,
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
                    Id = a.Id,
                    Name = a.Name,
                    Type = a.Type,
                    Location = a.Location,
                    IsActive = a.IsActive
                }).FirstOrDefaultAsync();

            return result;
        }

        public async Task<bool> UpdateAsset(int id, UpdateAsset asset)
        {
            var existingAsset = await context.Assets.FindAsync(id);

            if (existingAsset is null)
                return false;

            existingAsset.Name = asset.Name;
            existingAsset.Type = asset.Type;
            existingAsset.Location = asset.Location;
            existingAsset.IsActive = asset.IsActive;

            await context.SaveChangesAsync();

            return true;
        }
    }
}