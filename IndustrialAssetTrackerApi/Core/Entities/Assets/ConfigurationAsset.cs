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
                .HasMaxLength(255) 
                .IsRequired();     

            builder.Property(it => it.Type)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(it => it.Location)
                .HasMaxLength(500)
                .IsRequired();

            builder.Property(it => it.IsActive)
                .HasDefaultValue(true)
                .IsRequired();
        }

    }
}
