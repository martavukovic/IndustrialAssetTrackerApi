using IndustrialAssetTrackerApi.Models;
using IndustrialAssetTrackerApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IndustrialAssetTrackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetController(IAssetService service) : ControllerBase
    {

        // 1. DOHVATI SVE STROJEVE
        [HttpGet]
        public async Task<ActionResult<List<Asset>>> GetAllAssets()
                 => Ok(await service.GetAllAssets());

        [HttpGet("{id}")]
        public async Task<ActionResult<Asset>> GetSingleAsset(int id)
        {
            var asset = await service.GetSingleAsset(id);
            return asset is null ? NotFound("Asset with given ID not fount!") : Ok(asset);
        }
    }
}
