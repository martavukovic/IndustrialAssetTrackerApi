using IndustrialAssetTrackerApi.Application.Dtos.Assets;
using IndustrialAssetTrackerApi.Application.Services.Assets;
using IndustrialAssetTrackerApi.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IndustrialAssetTrackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetController(IAssetService service) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<GetAssetDto>>> GetAllAssets()
                 => Ok(await service.GetAllAssets());

        [HttpGet("{id}")]
        public async Task<ActionResult<GetAssetDto>> GetSingleAsset(int id)
        {
            var asset = await service.GetSingleAsset(id);
            return asset is null ? NotFound("Asset with given ID not found!") : Ok(asset);
        }

        [HttpPost]
        public async Task<ActionResult<GetAssetDto>> AddAsset([FromBody]CreateAsset asset)
        {
            var assets = await service.AddAsset(asset);
            return CreatedAtAction (nameof(GetSingleAsset), new { id = assets.Id }, assets);    
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GetAssetDto>> UpdateAsset(int id, UpdateAsset asset)
        {
            var assets = await service.UpdateAsset(id, asset);
            return assets is false ? NotFound("Asset with given ID not found!") : Ok(assets);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<GetAssetDto>> DeleteAsset(int id)
        {
            var assets = await service.DeleteAsset(id);
            return assets is false ? NotFound("Asset with given ID not found!") : Ok(assets);
        }
    }
}
