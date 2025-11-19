using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LegacyWebApp.Models
{
    /// <summary>
    /// Legacy Product model using Entity Framework 6
    /// Migration TODO:
    /// - Update to EF Core 8
    /// - Use modern C# features (init properties, required keyword)
    /// - Consider using record type for immutable properties
    /// </summary>
    [Table("Products")]
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }

        [Required]
        [StringLength(50)]
        public string SKU { get; set; }

        [Required]
        [StringLength(100)]
        public string Category { get; set; }

        public int StockQuantity { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? ModifiedDate { get; set; }

        // Old-style constructor
        public Product()
        {
            CreatedDate = DateTime.Now;
            IsActive = true;
            StockQuantity = 0;
        }

        // Helper method with old null checking pattern
        public string GetDisplayName()
        {
            if (string.IsNullOrEmpty(Name))
            {
                return "Unknown Product";
            }

            if (!string.IsNullOrEmpty(SKU))
            {
                return Name + " (" + SKU + ")";
            }

            return Name;
        }

        // Old-style validation
        public bool IsValid()
        {
            if (string.IsNullOrEmpty(Name))
                return false;

            if (string.IsNullOrEmpty(SKU))
                return false;

            if (Price <= 0)
                return false;

            return true;
        }
    }
}
