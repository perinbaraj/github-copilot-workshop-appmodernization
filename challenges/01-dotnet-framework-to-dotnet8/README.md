# Challenge 1: .NET Framework to .NET 8 Migration

## Overview

Migrate a legacy .NET Framework 4.8 ASP.NET MVC application to modern .NET 8 using GitHub Copilot App Modernization extension.

## Learning Objectives

- Use GitHub Copilot App Modernization for automated migration analysis
- Convert System.Web-based applications to ASP.NET Core
- Migrate Entity Framework 6 to Entity Framework Core 8
- Modernize configuration from Web.config to appsettings.json
- Implement dependency injection patterns
- Update C# code to leverage latest language features

## Prerequisites

- Visual Studio Code with GitHub Copilot extension
- GitHub Copilot App Modernization extension installed
- .NET 8 SDK
- Basic understanding of ASP.NET MVC and Entity Framework

## The Challenge

The `starter-code/LegacyWebApp` directory contains a legacy e-commerce application with:

- **ASP.NET MVC 5** controllers with synchronous operations
- **Entity Framework 6** with `DbContext` and manual initialization
- **Web.config** based configuration
- **System.Web** dependencies throughout
- Old-style **.csproj** format (non-SDK-style)
- No dependency injection

### Key Files to Migrate

1. **LegacyWebApp.csproj** - Old project format
2. **Web.config** - Legacy configuration
3. **Global.asax.cs** - Application lifecycle
4. **Controllers/ProductsController.cs** - MVC controller with EF6
5. **Models/ApplicationDbContext.cs** - EF6 DbContext
6. **App_Start/RouteConfig.cs** - Routing configuration

## Step-by-Step Guide

### Phase 1: Assessment (15 minutes)

Use GitHub Copilot App Modernization to analyze the legacy application.

1. **Open the project** in VS Code
2. **Right-click** on the `LegacyWebApp` folder
3. Select **"Analyze for Modernization"** (Copilot App Modernization)
4. **Review the assessment report**:
   - Identify incompatible APIs
   - Note deprecated packages
   - Review migration complexity score

**Expected Findings:**
- System.Web dependencies
- Entity Framework 6 usage
- Web.config configuration
- Missing DI setup

### Phase 2: Project File Conversion (20 minutes)

#### Task 1: Convert to SDK-Style Project

**Copilot Prompts:**
```
@workspace Convert LegacyWebApp.csproj to SDK-style project format for .NET 8
```

**What to expect:**
- New `<Project Sdk="Microsoft.NET.Sdk.Web">` format
- `<TargetFramework>net8.0</TargetFramework>`
- PackageReference instead of packages.config
- Removed unnecessary XML verbosity

#### Task 2: Update Package References

**Copilot Prompts:**
```
Replace Entity Framework 6 with Entity Framework Core 8 packages

Update ASP.NET MVC 5 packages to ASP.NET Core equivalents
```

**New packages needed:**
- `Microsoft.AspNetCore.App` (framework reference)
- `Microsoft.EntityFrameworkCore.SqlServer`
- `Microsoft.EntityFrameworkCore.Tools`

### Phase 3: Configuration Migration (20 minutes)

#### Task 3: Convert Web.config to appsettings.json

**Copilot Prompts:**
```
Create appsettings.json from Web.config settings

Migrate connection strings and app settings to modern configuration
```

**Expected output:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=LegacyDb;..."
  },
  "AppSettings": {
    "ApplicationName": "Modern E-Commerce",
    "MaxItemsPerPage": 50
  }
}
```

#### Task 4: Replace ConfigurationManager

**Copilot Prompts:**
```
Replace ConfigurationManager usage with IConfiguration in ProductsController

Use dependency injection for IConfiguration
```

### Phase 4: Entity Framework Migration (30 minutes)

#### Task 5: Migrate DbContext

**Copilot Prompts:**
```
Convert ApplicationDbContext from EF6 to EF Core 8

Replace Database.SetInitializer with EF Core migrations
```

**Key changes:**
- Remove `Database.SetInitializer`
- Update `OnModelCreating` syntax
- Add constructor with `DbContextOptions`

#### Task 6: Update Entity Models

**Copilot Prompts:**
```
Update Product model to use EF Core attributes and conventions

Remove EF6-specific annotations
```

### Phase 5: ASP.NET Core Migration (40 minutes)

#### Task 7: Create Program.cs

**Copilot Prompts:**
```
Create Program.cs for ASP.NET Core with dependency injection setup

Configure services including DbContext, MVC, and app settings
```

**Must include:**
- `builder.Services.AddDbContext<ApplicationDbContext>()`
- `builder.Services.AddControllersWithViews()`
- `app.MapControllerRoute()`

#### Task 8: Remove Global.asax

**Copilot Prompts:**
```
Move Global.asax.cs application startup logic to Program.cs

Configure middleware pipeline in Program.cs
```

#### Task 9: Update Controllers

**Copilot Prompts:**
```
Refactor ProductsController to use dependency injection

Replace manual DbContext instantiation with constructor injection

Convert synchronous database operations to async/await
```

**Example changes:**
```csharp
// Before (EF6)
var db = new ApplicationDbContext();
var products = db.Products.ToList();

// After (EF Core)
private readonly ApplicationDbContext _context;
public ProductsController(ApplicationDbContext context) 
    => _context = context;
var products = await _context.Products.ToListAsync();
```

#### Task 10: Update Views

**Copilot Prompts:**
```
Update Razor views to use ASP.NET Core tag helpers

Replace Html helpers with modern tag helper syntax
```

### Phase 6: Modernization (30 minutes)

#### Task 11: Apply C# 12 Features

**Copilot Prompts:**
```
Refactor Product model to use C# 12 primary constructors and init properties

Use file-scoped namespaces and global usings
```

#### Task 12: Add Modern Patterns

**Copilot Prompts:**
```
Add repository pattern for data access

Implement ILogger for structured logging

Use options pattern for configuration
```

### Phase 7: Validation (20 minutes)

#### Task 13: Build and Test

**Commands:**
```powershell
dotnet build
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
```

**Manual testing:**
- Navigate to `https://localhost:5001/Products`
- Create a new product
- Edit and delete operations
- Search functionality

#### Task 14: Verify Migration Success

**Copilot Prompts:**
```
Run GitHub Copilot App Modernization validation

Check for remaining legacy patterns or anti-patterns
```

## Success Criteria

- ✅ Application builds with `dotnet build`
- ✅ No System.Web dependencies remain
- ✅ Entity Framework Core migrations work
- ✅ All CRUD operations function correctly
- ✅ Configuration uses appsettings.json
- ✅ Dependency injection used throughout
- ✅ Async/await patterns implemented
- ✅ Modern C# features applied

## Common Pitfalls

1. **HttpContext.Current** - Replace with `IHttpContextAccessor`
2. **[ValidateAntiForgeryToken]** - Still works, but consider `[ValidateAntiForgeryToken]` with tag helpers
3. **RouteConfig** - Move to endpoint routing in Program.cs
4. **DbContext constructor** - Must accept `DbContextOptions<T>`
5. **Synchronous operations** - Convert to async throughout

## Bonus Challenges

1. Add minimal API endpoints alongside MVC
2. Implement health checks
3. Add OpenTelemetry observability
4. Containerize with Docker
5. Add integration tests with WebApplicationFactory

## Resources

- [.NET Upgrade Assistant](https://dotnet.microsoft.com/platform/upgrade-assistant)
- [EF Core vs EF6](https://learn.microsoft.com/ef/efcore-and-ef6/)
- [ASP.NET Core Migration Guide](https://learn.microsoft.com/aspnet/core/migration/proper-to-2x/)
- [C# 12 Features](https://learn.microsoft.com/dotnet/csharp/whats-new/csharp-12)

## Estimated Time

**Total: 3-4 hours**

- Assessment: 15 minutes
- Project conversion: 20 minutes
- Configuration: 20 minutes
- EF migration: 30 minutes
- ASP.NET Core migration: 40 minutes
- Modernization: 30 minutes
- Validation: 20 minutes
- Buffer: 45 minutes

---

**Next Challenge:** [Java 8 to 17 Migration](../02-java-8-to-17-migration/README.md)

### Part 2: Project File Modernization (15-20 minutes)

1. **Convert to SDK-style .csproj**:
   ```
   Convert this .NET Framework .csproj to SDK-style .NET 8 format
   
   Generate a new .csproj for .NET 8 with all necessary package references
   
   Replace Web.config settings with appsettings.json
   ```

2. **Update NuGet packages**:
   ```
   List all NuGet packages that need updating for .NET 8
   
   Find .NET 8 equivalents for these .NET Framework libraries
   ```

### Part 3: ASP.NET MVC to ASP.NET Core Migration (25-30 minutes)

1. **Convert Controllers**:
   ```
   Migrate this ASP.NET MVC controller to ASP.NET Core MVC
   
   Update routing attributes for ASP.NET Core
   
   Replace HttpContext.Current with dependency-injected IHttpContextAccessor
   ```

2. **Update Views (Razor)**:
   ```
   Convert these Razor views to ASP.NET Core syntax
   
   Replace @Html helpers with Tag Helpers
   
   Update _ViewStart and _Layout for ASP.NET Core
   ```

3. **Migrate Filters and Middleware**:
   ```
   Convert ActionFilters to ASP.NET Core filters
   
   Replace HTTP modules with ASP.NET Core middleware
   
   Implement custom middleware for authentication
   ```

### Part 4: Entity Framework 6 to EF Core Migration (20-30 minutes)

1. **Update DbContext**:
   ```
   Migrate Entity Framework 6 DbContext to EF Core 8
   
   Convert Database.SetInitializer to EF Core migrations
   
   Update LINQ queries for EF Core compatibility
   ```

2. **Fix Breaking Changes**:
   ```
   Replace eager loading patterns for EF Core
   
   Update lazy loading configuration
   
   Migrate stored procedure calls to FromSqlRaw
   ```

### Part 5: Configuration & Dependency Injection (15-20 minutes)

1. **Configuration Migration**:
   ```
   Convert Web.config to appsettings.json
   
   Migrate ConfigurationManager to IConfiguration
   
   Set up configuration for different environments
   ```

2. **Implement DI**:
   ```
   Replace manual service instantiation with dependency injection
   
   Register services in Program.cs
   
   Convert static dependencies to injected services
   ```

### Part 6: Modernize C# Code (20-25 minutes)

1. **Use Latest C# Features**:
   ```
   Convert properties to init-only setters
   
   Use record types for DTOs
   
   Implement pattern matching in switch expressions
   
   Replace null checks with null-coalescing and null-conditional operators
   
   Use file-scoped namespaces
   
   Apply required members and primary constructors
   ```

2. **Async/Await Modernization**:
   ```
   Convert synchronous database calls to async
   
   Update action methods to return Task<IActionResult>
   
   Implement async streams where appropriate
   ```

## 🛠️ Using GitHub Copilot App Modernization Extension

### Key Features to Use:

1. **Compatibility Analysis**
   - Right-click on project → "Analyze for .NET 8 Migration"
   - Get automated API compatibility report
   - Identify problematic dependencies

2. **Code Migration Assistant**
   - Inline suggestions for System.Web replacements
   - Automatic conversion of configuration patterns
   - Entity Framework migration helpers

3. **Breaking Change Detection**
   - Identify removed APIs
   - Suggest modern alternatives
   - Highlight behavioral differences

4. **Performance Recommendations**
   - Suggest async patterns
   - Identify blocking calls
   - Recommend memory optimizations

## ✅ Completion Criteria

- [ ] Application runs on .NET 8
- [ ] All System.Web dependencies removed
- [ ] ASP.NET Core MVC controllers working
- [ ] Entity Framework Core 8 integrated
- [ ] Configuration using appsettings.json
- [ ] Dependency injection implemented
- [ ] At least 3 modern C# 12 features used
- [ ] All async operations properly implemented
- [ ] Application can be containerized with Docker
- [ ] Tests pass on .NET 8

## 🎓 Learning Outcomes

By completing this challenge, you will learn to:
- Use GitHub Copilot for framework migration analysis
- Leverage AI to identify and fix breaking changes
- Modernize legacy .NET code with latest features
- Implement ASP.NET Core best practices
- Migrate Entity Framework 6 to EF Core
- Apply modern C# language features
- Use Copilot for configuration modernization

## 📚 Helpful Copilot Prompts

```
@workspace Analyze all System.Web usages and suggest replacements

Convert this .NET Framework controller to .NET 8 ASP.NET Core

Migrate this Entity Framework 6 DbContext to EF Core 8

Replace Web.config app settings with IConfiguration pattern

Update this code to use C# 12 features like primary constructors

Generate a Dockerfile for this .NET 8 application

Create integration tests for the migrated controllers

Implement health checks and observability for .NET 8

Convert synchronous methods to async with proper error handling

Generate API documentation using Swagger/OpenAPI for .NET 8
```

## 🔍 Common Migration Issues

| Issue | Copilot Prompt |
|-------|----------------|
| System.Web.Http | `Replace with Microsoft.AspNetCore.Mvc` |
| HttpContext.Current | `Use IHttpContextAccessor with DI` |
| Web.config | `Convert to appsettings.json with IConfiguration` |
| ActionFilterAttribute | `Migrate to ASP.NET Core IActionFilter` |
| EF6 DbContext | `Convert to EF Core DbContext` |
| ConfigurationManager | `Replace with IConfiguration` |
| Global.asax | `Replace with Program.cs and Startup` |
| BundleConfig | `Use built-in static files and CDN` |

## 🐳 Bonus: Containerization

```
Create a multi-stage Dockerfile for this .NET 8 application

Generate docker-compose.yml with SQL Server for local development

Add health checks to the Docker container

Configure the application for container orchestration
```
