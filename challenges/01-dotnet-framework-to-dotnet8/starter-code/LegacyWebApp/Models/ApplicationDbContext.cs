using System.Data.Entity;

namespace LegacyWebApp.Models
{
    /// <summary>
    /// Legacy DbContext using Entity Framework 6
    /// Migration TODO:
    /// - Migrate to EF Core 8 DbContext
    /// - Replace Database.SetInitializer
    /// - Update connection string handling
    /// - Implement proper DbContextOptions pattern
    /// </summary>
    public class ApplicationDbContext : DbContext
    {
        // Old EF6 constructor pattern
        public ApplicationDbContext() : base("DefaultConnection")
        {
            // Disable lazy loading by default
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;

            // Old EF6 database initialization
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<ApplicationDbContext>());
        }

        public DbSet<Product> Products { get; set; }

        // Old EF6 OnModelCreating
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Legacy configuration
            modelBuilder.Entity<Product>()
                .Property(p => p.SKU)
                .HasColumnType("varchar")
                .HasMaxLength(50)
                .IsRequired();

            modelBuilder.Entity<Product>()
                .HasIndex(p => p.SKU)
                .IsUnique();

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);
        }

        // Static factory method (old pattern)
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}
