using Microsoft.EntityFrameworkCore;
using System.Reflection;
using IndustrialAssetTrackerApi.Core.Entities.Assets;

namespace IndustrialAssetTrackerApi.Infrastructure.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Asset> Assets => Set<Asset>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
