# GitHub Copilot Prompts for .NET Framework to .NET 8 Migration

This document contains effective GitHub Copilot prompts for each phase of the migration challenge.

## Phase 1: Assessment & Analysis

### Initial Analysis
```
@workspace Analyze this .NET Framework application for migration to .NET 8. Identify System.Web dependencies, EF6 usage, and configuration patterns.
```

### Dependency Review
```
Show me all System.Web namespace usages in this project

List all Entity Framework 6 specific code patterns that need migration
```

### Migration Planning
```
Create a migration checklist from .NET Framework 4.8 to .NET 8 for this web application
```

## Phase 2: Project File Conversion

### SDK-Style Project
```
@workspace Convert LegacyWebApp.csproj to SDK-style project format targeting .NET 8

Transform this old-style csproj to modern SDK format with PackageReference
```

### Package Migration
```
Replace these .NET Framework packages with .NET 8 equivalents:
- EntityFramework 6.4.4
- Microsoft.AspNet.Mvc 5.2.7
- Newtonsoft.Json 12.0.2

Show me the new PackageReference format for ASP.NET Core MVC and EF Core 8
```

### Remove Obsolete Files
```
Which files from .NET Framework projects are no longer needed in .NET 8?

Can I delete packages.config, Global.asax, and AssemblyInfo.cs? What replaces them?
```

## Phase 3: Configuration Migration

### appsettings.json Creation
```
Convert this Web.config to appsettings.json format

Migrate connectionStrings, appSettings, and entityFramework sections to modern configuration
```

### Configuration Usage
```
Replace all ConfigurationManager.AppSettings calls with IConfiguration

Update ProductsController to use IConfiguration instead of ConfigurationManager
```

### Strongly-Typed Configuration
```
Create options classes for configuration sections using the options pattern

Bind AppSettings section to a strongly-typed class
```

## Phase 4: Entity Framework Migration

### DbContext Conversion
```
Convert this EF6 DbContext to Entity Framework Core 8

Replace Database.SetInitializer with EF Core migration approach
```

### Fluent API Updates
```
Update OnModelCreating fluent API from EF6 to EF Core 8 syntax

Convert this HasRequired/WithMany relationship to EF Core format
```

### Query Modernization
```
Convert these synchronous LINQ queries to async with EF Core

Replace .Include() string literals with strongly-typed expressions
```

### Migration Commands
```
Generate EF Core migration for this DbContext

Create initial migration with all existing entities
```

## Phase 5: ASP.NET Core Migration

### Program.cs Creation
```
Create Program.cs for ASP.NET Core 8 with minimal hosting model

Configure services: DbContext, MVC controllers with views, IConfiguration options
```

### Dependency Injection
```
Refactor ProductsController to use constructor dependency injection

Inject IConfiguration, ApplicationDbContext, and ILogger into this controller
```

### Controller Modernization
```
Convert this synchronous MVC action to async/await

Replace manual DbContext instantiation with injected context

Update this controller to return IActionResult with async operations
```

### Routing Migration
```
Move RouteConfig.RegisterRoutes to endpoint routing in Program.cs

Convert this conventional route to app.MapControllerRoute()
```

### Middleware Pipeline
```
Configure ASP.NET Core middleware pipeline: static files, routing, authentication, authorization, MVC

What middleware replaces Global.asax Application_BeginRequest?
```

## Phase 6: View Migration

### Tag Helpers
```
Convert Html.ActionLink to anchor tag helper

Replace @Html.TextBoxFor with input tag helper

Update this form with ASP.NET Core tag helpers
```

### Layout Updates
```
Update _Layout.cshtml for ASP.NET Core (remove System.Web references)

Add _ViewImports.cshtml with tag helper directives
```

## Phase 7: Code Modernization

### C# 12 Features
```
Refactor this class to use C# 12 primary constructors

Convert to file-scoped namespace and add global usings

Use collection expressions for this array/list initialization
```

### Nullable Reference Types
```
Enable nullable reference types for this project

Add nullable annotations to Product model
```

### Pattern Matching
```
Simplify this if-else chain using pattern matching

Use switch expression for this type checking logic
```

### Record Types
```
Convert this DTO class to a record type

Create immutable record for Product with init-only properties
```

## Phase 8: Modern Patterns

### Repository Pattern
```
Create a generic repository pattern for data access

Implement IProductRepository with async methods
```

### Logging
```
Add ILogger<T> to ProductsController for structured logging

Log operations with semantic logging and log levels
```

### Options Pattern
```
Create AppSettings options class and register with dependency injection

Use IOptions<AppSettings> in controllers
```

### Validation
```
Add data annotations validation to Product model

Implement FluentValidation for ProductController inputs
```

## Phase 9: Testing & Validation

### Build Verification
```
What dotnet CLI commands should I run to build and test this migration?

Check for any remaining .NET Framework dependencies
```

### Migration Validation
```
@workspace Scan for remaining System.Web usages

Identify any legacy patterns that should be modernized

Check if all async opportunities are implemented
```

### Integration Testing
```
Create WebApplicationFactory test for ProductsController

Add integration test for CRUD operations
```

## Phase 10: Deployment Preparation

### Dockerfile
```
Create Dockerfile for this .NET 8 web application

Add docker-compose.yml with SQL Server for local development
```

### CI/CD
```
Generate GitHub Actions workflow to build and test this .NET 8 app

Create Azure DevOps pipeline YAML for deployment
```

## Advanced Prompts

### Performance Optimization
```
Identify N+1 query problems in this controller

Add query result caching for frequently accessed data

Optimize this LINQ query for better performance
```

### Security Hardening
```
Add HTTPS redirection and HSTS configuration

Implement CSRF protection with AntiForgeryToken

Configure CORS policy for this API
```

### Observability
```
Add health checks for database and external dependencies

Implement OpenTelemetry instrumentation

Add application insights telemetry
```

## Troubleshooting Prompts

### Build Errors
```
This migration gives error CS0246: type or namespace not found. How do I fix it?

EF Core migration fails with "No DbContext was found". What's missing?
```

### Runtime Issues
```
Getting "Unable to resolve service for type ApplicationDbContext". What's wrong with DI setup?

Navigation properties are null in EF Core. How to fix lazy loading?
```

### Configuration Problems
```
Connection string not loading from appsettings.json. How to debug IConfiguration?

IOptions<T> returns null values. How to properly bind configuration?
```

## Best Practices

### Before Each Major Change
```
@workspace Review current code before migrating [specific component]

Show examples of modern .NET 8 pattern for [specific scenario]
```

### After Each Major Change
```
@workspace Validate this migration step. Any issues or improvements?

Check if this code follows .NET 8 best practices
```

### Incremental Approach
```
What's the minimal change to make this controller work in .NET 8?

Show me one step at a time for migrating this DbContext
```

## Tips for Effective Prompts

1. **Be specific**: Mention exact class names, files, and technologies
2. **Use @workspace**: For context-aware suggestions across files
3. **Ask for examples**: "Show me how to..." gets concrete code
4. **Incremental refinement**: Start broad, then narrow down
5. **Validation prompts**: Ask Copilot to review your changes
6. **Explain why**: Ask "Why is this approach better?" to learn

---

**Remember:** GitHub Copilot App Modernization extension can automate many of these steps. Use it as your primary tool, and these prompts as supplementary guidance.
