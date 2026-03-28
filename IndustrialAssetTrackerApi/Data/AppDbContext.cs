using Microsoft.EntityFrameworkCore;
using IndustrialAssetTrackerApi.Models;

namespace IndustrialAssetTrackerApi.Data
{
    public class AppDbContext (DbContextOptions <AppDbContext> options): DbContext(options)
    {
        public DbSet<Asset> Assets => Set<Asset>();  
    }
}
