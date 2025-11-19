# Solution Guide: .NET Framework to .NET 8 Migration

This guide provides detailed solutions for migrating the legacy application to .NET 8.

## Overview

This solution demonstrates a complete migration from .NET Framework 4.8 ASP.NET MVC to .NET 8 ASP.NET Core.

## Phase 1: Project File Conversion

### New LegacyWebApp.csproj (SDK-Style)

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.0">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>

</Project>
```

**Key changes:**
- SDK-style format with `Sdk="Microsoft.NET.Sdk.Web"`
- `TargetFramework` set to `net8.0`
- Nullable reference types enabled
- Implicit usings enabled
- EF Core 8 packages

## Phase 2: Configuration Migration

### appsettings.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=ModernECommerceDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  },
  "AppSettings": {
    "ApplicationName": "Modern E-Commerce",
    "MaxItemsPerPage": 50,
    "EnableDetailedErrors": false
  }
}
```

### appsettings.Development.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft.AspNetCore": "Information"
    }
  },
  "AppSettings": {
    "EnableDetailedErrors": true
  }
}
```

### AppSettings Options Class

```csharp
namespace LegacyWebApp.Configuration;

public class AppSettings
{
    public string ApplicationName { get; init; } = string.Empty;
    public int MaxItemsPerPage { get; init; }
    public bool EnableDetailedErrors { get; init; }
}
```

## Phase 3: Entity Framework Core Migration

### Updated ApplicationDbContext.cs

```csharp
using Microsoft.EntityFrameworkCore;

namespace LegacyWebApp.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("Products");
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(e => e.SKU)
                .IsRequired()
                .HasMaxLength(50);

            entity.Property(e => e.Category)
                .HasMaxLength(100);

            entity.Property(e => e.Description)
                .HasMaxLength(1000);

            entity.Property(e => e.Price)
                .HasColumnType("decimal(18,2)");

            entity.HasIndex(e => e.SKU)
                .IsUnique();

            entity.HasIndex(e => e.Category);
        });
    }
}
```

**Key changes:**
- Constructor accepts `DbContextOptions<ApplicationDbContext>`
- Removed `Database.SetInitializer`
- Updated `OnModelCreating` to use `ModelBuilder`
- Used EF Core fluent API syntax
- Added indexes for performance

### Updated Product.cs

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LegacyWebApp.Models;

[Table("Products")]
public class Product
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Product name is required")]
    [StringLength(200)]
    public required string Name { get; set; }

    [Required(ErrorMessage = "SKU is required")]
    [StringLength(50)]
    public required string SKU { get; set; }

    [StringLength(1000)]
    public string? Description { get; set; }

    [Range(0.01, 999999.99, ErrorMessage = "Price must be between 0.01 and 999,999.99")]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }

    [StringLength(100)]
    public string? Category { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "Stock quantity cannot be negative")]
    public int StockQuantity { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    public DateTime? LastModifiedDate { get; set; }
}
```

**Key changes:**
- Using nullable reference types (`string?`)
- `required` keyword for non-nullable reference types
- Modern data annotations
- Default values with property initializers

## Phase 4: ASP.NET Core Setup

### Program.cs

```csharp
using LegacyWebApp.Configuration;
using LegacyWebApp.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllersWithViews();

// Configure DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure options pattern
builder.Services.Configure<AppSettings>(
    builder.Configuration.GetSection("AppSettings"));

// Add logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

**Key features:**
- Minimal hosting model
- Dependency injection setup
- DbContext configuration
- Options pattern registration
- Middleware pipeline
- Endpoint routing

## Phase 5: Controller Migration

### Updated ProductsController.cs

```csharp
using LegacyWebApp.Configuration;
using LegacyWebApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace LegacyWebApp.Controllers;

public class ProductsController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<ProductsController> _logger;
    private readonly AppSettings _appSettings;

    public ProductsController(
        ApplicationDbContext context,
        ILogger<ProductsController> logger,
        IOptions<AppSettings> appSettings)
    {
        _context = context;
        _logger = logger;
        _appSettings = appSettings.Value;
    }

    // GET: Products
    public async Task<IActionResult> Index(string? searchTerm, string? category)
    {
        _logger.LogInformation("Fetching products with search: {SearchTerm}, category: {Category}",
            searchTerm, category);

        var query = _context.Products.AsQueryable();

        if (!string.IsNullOrWhiteSpace(searchTerm))
        {
            query = query.Where(p => p.Name.Contains(searchTerm) || 
                                     p.Description!.Contains(searchTerm));
        }

        if (!string.IsNullOrWhiteSpace(category))
        {
            query = query.Where(p => p.Category == category);
        }

        var products = await query
            .OrderBy(p => p.Name)
            .Take(_appSettings.MaxItemsPerPage)
            .ToListAsync();

        return View(products);
    }

    // GET: Products/Details/5
    public async Task<IActionResult> Details(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var product = await _context.Products
            .FirstOrDefaultAsync(m => m.Id == id);

        if (product == null)
        {
            _logger.LogWarning("Product not found: {ProductId}", id);
            return NotFound();
        }

        return View(product);
    }

    // GET: Products/Create
    public IActionResult Create()
    {
        return View();
    }

    // POST: Products/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Product product)
    {
        if (!ModelState.IsValid)
        {
            return View(product);
        }

        try
        {
            product.CreatedDate = DateTime.UtcNow;
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Product created: {ProductId} - {ProductName}",
                product.Id, product.Name);

            return RedirectToAction(nameof(Index));
        }
        catch (DbUpdateException ex)
        {
            _logger.LogError(ex, "Error creating product: {ProductName}", product.Name);
            ModelState.AddModelError("", "Unable to save changes. Try again.");
            return View(product);
        }
    }

    // GET: Products/Edit/5
    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return NotFound();
        }

        return View(product);
    }

    // POST: Products/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, Product product)
    {
        if (id != product.Id)
        {
            return NotFound();
        }

        if (!ModelState.IsValid)
        {
            return View(product);
        }

        try
        {
            product.LastModifiedDate = DateTime.UtcNow;
            _context.Update(product);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Product updated: {ProductId}", product.Id);
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await ProductExistsAsync(product.Id))
            {
                return NotFound();
            }
            throw;
        }

        return RedirectToAction(nameof(Index));
    }

    // GET: Products/Delete/5
    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var product = await _context.Products
            .FirstOrDefaultAsync(m => m.Id == id);

        if (product == null)
        {
            return NotFound();
        }

        return View(product);
    }

    // POST: Products/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product != null)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Product deleted: {ProductId}", id);
        }

        return RedirectToAction(nameof(Index));
    }

    private async Task<bool> ProductExistsAsync(int id)
    {
        return await _context.Products.AnyAsync(e => e.Id == id);
    }
}
```

**Key changes:**
- Constructor dependency injection
- Async/await throughout
- `ILogger<T>` for structured logging
- `IOptions<AppSettings>` for configuration
- Proper error handling
- Modern C# patterns

## Phase 6: View Updates

### _ViewImports.cshtml

```cshtml
@using LegacyWebApp
@using LegacyWebApp.Models
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
```

### Updated Products/Index.cshtml (with Tag Helpers)

```cshtml
@model IEnumerable<Product>

@{
    ViewBag.Title = "Products";
}

<h2>Product Catalog</h2>

<p>
    <a asp-action="Create" class="btn btn-primary">Create New Product</a>
</p>

<form asp-action="Index" method="get" class="mb-3">
    <div class="row">
        <div class="col-md-4">
            <input type="text" name="searchTerm" class="form-control" placeholder="Search products..." />
        </div>
        <div class="col-md-3">
            <input type="text" name="category" class="form-control" placeholder="Category" />
        </div>
        <div class="col-md-2">
            <button type="submit" class="btn btn-primary">Search</button>
        </div>
    </div>
</form>

<table class="table table-striped">
    <thead>
        <tr>
            <th>@Html.DisplayNameFor(model => model.Name)</th>
            <th>@Html.DisplayNameFor(model => model.SKU)</th>
            <th>@Html.DisplayNameFor(model => model.Category)</th>
            <th>@Html.DisplayNameFor(model => model.Price)</th>
            <th>@Html.DisplayNameFor(model => model.StockQuantity)</th>
            <th>@Html.DisplayNameFor(model => model.IsActive)</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        @foreach (var item in Model)
        {
            <tr>
                <td>@item.Name</td>
                <td>@item.SKU</td>
                <td>@item.Category</td>
                <td>@item.Price.ToString("C")</td>
                <td>@item.StockQuantity</td>
                <td>@(item.IsActive ? "Yes" : "No")</td>
                <td>
                    <a asp-action="Edit" asp-route-id="@item.Id">Edit</a> |
                    <a asp-action="Details" asp-route-id="@item.Id">Details</a> |
                    <a asp-action="Delete" asp-route-id="@item.Id">Delete</a>
                </td>
            </tr>
        }
    </tbody>
</table>

@if (!Model.Any())
{
    <p class="text-muted">No products found.</p>
}
```

**Key changes:**
- Tag helpers (`asp-action`, `asp-route-id`)
- Modern form helpers
- Bootstrap classes

## Phase 7: Database Migration

### Commands

```powershell
# Create initial migration
dotnet ef migrations add InitialCreate

# Update database
dotnet ef database update

# Verify migration
dotnet ef migrations list
```

## Phase 8: Build and Run

### Commands

```powershell
# Restore dependencies
dotnet restore

# Build
dotnet build

# Run
dotnet run

# Navigate to
# https://localhost:5001/Products
```

## Verification Checklist

- ✅ **Build succeeds** with `dotnet build`
- ✅ **No System.Web references** remain
- ✅ **Entity Framework Core** migrations work
- ✅ **Dependency injection** used throughout
- ✅ **Async/await** patterns implemented
- ✅ **Configuration** uses appsettings.json
- ✅ **Logging** with ILogger
- ✅ **Tag helpers** in views
- ✅ **C# 12 features** applied where appropriate

## Performance Improvements

The migrated application benefits from:

1. **Async operations** - Better scalability
2. **EF Core query optimization** - Faster database access
3. **Dependency injection** - Better resource management
4. **Built-in logging** - Better observability
5. **Middleware pipeline** - Efficient request processing

## Next Steps

1. Add integration tests with `WebApplicationFactory`
2. Implement repository pattern
3. Add API endpoints (minimal APIs)
4. Containerize with Docker
5. Add health checks
6. Implement caching
7. Add OpenTelemetry

---

**Congratulations!** You've successfully migrated a legacy .NET Framework application to modern .NET 8.
