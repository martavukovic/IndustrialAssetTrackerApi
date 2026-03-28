using IndustrialAssetTrackerApi.Models;

namespace IndustrialAssetTrackerApi.Services
{
    public class AssetService : IAssetService
    {
        // Ovo je privremena lista strojeva (dok ne spojimo pravu bazu u drugom dijelu videa)
        private static List<Asset> assets = new List<Asset>
        {
            new Asset {
                Id = 1,
                Name = "Industrijska Pumpa 01",
                Type = "Pumpa",
                Location = "Hala A",
                IsActive = true
            },
            new Asset {
                Id = 2,
                Name = "Senzor Temperature",
                Type = "Senzor",
                Location = "Skladište 2",
                IsActive = false
            }
        };
        public Task<List<Asset>> AddAsset(Asset asset)
        {
            throw new NotImplementedException();
        }

        public Task<List<Asset>?> DeleteAsset(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Asset>> GetAllAssets()
                => await Task.FromResult (assets);

        public async Task<Asset?> GetSingleAsset(int id)
        {
            var result = assets.FirstOrDefault(a => a.Id == id);
            return await Task.FromResult(result);
        }

        public Task<List<Asset>?> UpdateAsset(int id, Asset request)
        {
            throw new NotImplementedException();
        }
    }
}
