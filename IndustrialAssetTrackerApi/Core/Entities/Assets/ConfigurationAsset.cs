using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IndustrialAssetTrackerApi.Core.Entities.Assets
{
    public class ConfigurationAsset : IEntityTypeConfiguration<Asset>
    {
        public void Configure(EntityTypeBuilder<Asset> builder)
        {
            builder.HasKey(it => it.Id);

            builder.Property(it => it.Name)
                .HasMaxLength(AssetConsts.NameMaxLength) 
                .IsRequired();

            builder.Property(it => it.Type)
                .HasMaxLength(AssetConsts.TypeMaxLength) 
                .IsRequired();

            builder.Property(it => it.Location)
                .HasMaxLength(AssetConsts.LocationMaxLength) 
                .IsRequired();
        }

    }
}
