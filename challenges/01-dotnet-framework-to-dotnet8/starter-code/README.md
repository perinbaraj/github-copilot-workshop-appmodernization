# Legacy .NET Framework 4.8 Web Application

This is a legacy e-commerce web application that needs migration to .NET 8.

## Current Stack

- **.NET Framework 4.8**
- **ASP.NET MVC 5**
- **Entity Framework 6**
- **System.Web** dependencies
- **Web.config** based configuration
- Traditional .csproj format

## Target Stack

- **.NET 8**
- **ASP.NET Core MVC**
- **Entity Framework Core 8**
- **Microsoft.AspNetCore** dependencies
- **appsettings.json** configuration
- SDK-style .csproj format

## Project Structure

```
LegacyWebApp/
├── Controllers/
│   ├── HomeController.cs       # Legacy MVC controller
│   └── ProductsController.cs   # CRUD operations with EF6
├── Models/
│   ├── Product.cs              # EF6 entity
│   └── ApplicationDbContext.cs # EF6 DbContext
├── Views/
│   ├── Home/
│   ├── Products/
│   └── Shared/
│       └── _Layout.cshtml
├── App_Start/
│   └── RouteConfig.cs          # Old routing
├── Global.asax                 # Application startup
└── Web.config                  # Configuration
```

## Key Migration Challenges

### 1. System.Web Dependencies
- `System.Web.Mvc` → `Microsoft.AspNetCore.Mvc`
- `System.Web.Http` → ASP.NET Core APIs
- `HttpContext.Current` → `IHttpContextAccessor`

### 2. Entity Framework 6 → EF Core 8
- `DbContext` constructor patterns
- `Database.SetInitializer` → Migrations
- Configuration API differences
- LINQ query behaviors

### 3. Configuration
- `Web.config` → `appsettings.json`
- `ConfigurationManager` → `IConfiguration`
- `appSettings` → strongly-typed options

### 4. Dependency Injection
- Manual instantiation → Built-in DI
- Service registration in `Program.cs`
- Constructor injection patterns

### 5. Routing
- `RouteConfig.RegisterRoutes` → `app.MapControllerRoute()`
- Endpoint routing
- Attribute routing improvements

## Running the Legacy Application

**Prerequisites:**
- Visual Studio 2019/2022
- .NET Framework 4.8 SDK
- SQL Server LocalDB

**Steps:**
1. Open `LegacyWebApp.csproj` in Visual Studio
2. Restore NuGet packages
3. Build the solution
4. Run (F5)

**Note:** This is LEGACY code. It will NOT run on .NET 8 without migration!

## Your Mission

Use **GitHub Copilot App Modernization extension** to:

1. **Analyze** the legacy codebase for migration blockers
2. **Convert** project to SDK-style .csproj
3. **Migrate** ASP.NET MVC to ASP.NET Core
4. **Update** Entity Framework 6 to EF Core 8
5. **Replace** Web.config with appsettings.json
6. **Implement** dependency injection
7. **Modernize** C# code with latest features
8. **Test** the migrated application

## Helpful Resources

- [.NET Upgrade Assistant](https://dotnet.microsoft.com/platform/upgrade-assistant)
- [EF Core Migration Guide](https://learn.microsoft.com/ef/core/what-is-new/ef-core-8.0/breaking-changes)
- [ASP.NET Core Migration](https://learn.microsoft.com/aspnet/core/migration/mvc)
