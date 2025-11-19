# GitHub Copilot Workshop - Application Modernization

A hands-on workshop with practical challenges designed to help developers master GitHub Copilot for modernizing legacy applications. This workshop heavily utilizes **GitHub Copilot and App Modernization extension** to accelerate the modernization process across multiple technology stacks.

## 🎯 Workshop Overview

This workshop contains 3 comprehensive challenges that will guide you through the process of modernizing legacy applications using GitHub Copilot. Each challenge includes starter code, detailed instructions, solution guides, and Copilot prompting strategies.

## 📚 Available Challenges

### 1. 🪟 .NET Framework to .NET 8 Migration
**Difficulty:** 🔴 Advanced | **Duration:** 3-4 hours
Migrate a legacy .NET Framework 4.8 ASP.NET MVC application to modern .NET 8, converting Entity Framework 6 to EF Core 8, and modernizing with latest C# features.

### 2. ☕️ Java 8 to 17 Migration
**Difficulty:** 🟡 Intermediate | **Duration:** 60-90 minutes
Upgrade a legacy Java 8 application to Java 17, leveraging Copilot to identify and fix breaking changes, and adopt new language features.

### 3. 🅰️ AngularJS to React Migration
**Difficulty:** 🔴 Advanced | **Duration:** 4-5 hours
Migrate a legacy AngularJS 1.8 task management application to modern React 18 with TypeScript, replacing outdated patterns with hooks and modern tooling.

## 🎓 Recommended Learning Path

### For .NET Developers
1. **Java 8 to 17 Migration** (Challenge 2) - Warm up with Java modernization
2. **.NET Framework to .NET 8** (Challenge 1) - Deep dive into .NET migration

### For Frontend Developers
1. **AngularJS to React** (Challenge 3) - Framework migration skills
2. **Java 8 to 17** (Challenge 2) - Learn backend modernization

### For Full-Stack Developers
Complete all three challenges in order to master modernization across the entire stack.

## 🏆 Skill Categories

### 🤖 AI-Assisted Modernization
- Effective Copilot Prompting
- Code Analysis and Refactoring
- AI-Assisted Migration
- Context Management for Large Codebases
- GitHub Copilot App Modernization Extension

### 🪟 .NET Technologies
- .NET Framework to .NET 8 Migration
- ASP.NET Core
- Entity Framework Core 8
- C# 12 Features
- Dependency Injection

### ☕️ Java Technologies
- Java 17 Features
- Spring Boot 3.x
- Maven Dependency Management
- Jakarta EE

### 🅰️ Frontend Technologies
- React 18 with Hooks
- TypeScript
- React Router v6
- Vite Build Tool
- Tailwind CSS
- AngularJS Legacy Patterns

## 🗺️ How to Use This Workshop

### For Individual Learning
1.  **Browse** the `challenges/` directory.
2.  **Choose** a challenge that interests you.
3.  **Read** the challenge `README.md` carefully.
4.  **Follow** the instructions step by step.
5.  **Practice** effective Copilot prompting.
6.  **Review** the `SOLUTION_GUIDE.md` when complete.

### For Team Training
1.  **Assign** challenges to team members.
2.  **Set** completion timeframes.
3.  **Share** learning outcomes in team meetings.
4.  **Discuss** effective prompting strategies.
5.  **Build** a team knowledge base on Java modernization.

### Workshop Structure
Each challenge contains:
- 📖 `README.md` - Challenge overview, learning objectives, and step-by-step instructions
- 🎯 **Starter Code** - Legacy application with realistic outdated patterns
- 📝 `SOLUTION_GUIDE.md` - Detailed solutions with complete code examples
- 💡 `COPILOT_PROMPTS.md` - Curated Copilot prompts for each migration phase
- ✅ **Completion Criteria** - Checklist to validate successful migration

**Using the App Modernization Extension:**
- Each challenge includes specific steps to leverage the App Modernization extension
- Assessment reports help identify migration challenges upfront
- Interactive chat assists with complex refactoring decisions
- Validation tools ensure completeness of migration

## 🚀 Getting Started

### Prerequisites

#### 1. GitHub Copilot Access
- Active GitHub Copilot subscription (Individual, Business, or Enterprise)
- GitHub account with Copilot enabled

#### 2. Visual Studio Code Setup
**Required Extensions:**
- [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) - AI pair programmer
- [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) - Conversational AI assistant
- [GitHub Copilot App Modernization](https://marketplace.visualstudio.com/items?itemName=vscjava.migrate-java-to-azure) - Specialized extension for application modernization (Required for Challenge 1)

**Installation Steps:**
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X or Cmd+Shift+X)
3. Search for "GitHub Copilot" and install all three extensions
4. Sign in with your GitHub account when prompted
5. Restart VS Code to activate the extensions

#### 3. Technology-Specific Prerequisites

**For Challenge 1 (.NET Framework to .NET 8):**
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or later
- [SQL Server LocalDB](https://learn.microsoft.com/sql/database-engine/configure-windows/sql-server-express-localdb) (included with Visual Studio)
- Windows OS (recommended for .NET Framework comparison)

**For Challenge 2 (Java 8 to 17):**
- **Java Development Kit (JDK)** - [JDK 17](https://adoptium.net/) or later
- **Maven** - [Apache Maven 3.6+](https://maven.apache.org/download.cgi)

**For Challenge 3 (AngularJS to React):**
- [Node.js 18+](https://nodejs.org/) and npm
- Modern web browser (Chrome, Firefox, or Edge)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/perinbaraj/github-copilot-workshop-appmodernization.git
cd github-copilot-workshop-appmodernization/

# Navigate to any challenge
cd challenges/01-dotnet-framework-to-dotnet8  # or any challenge folder

# Follow the challenge README
cat README.md
```

### 🔧 Using GitHub Copilot App Modernization Extension

The **GitHub Copilot App Modernization extension** is a specialized tool designed to accelerate application modernization tasks. Here's how to use it effectively:

#### Setup Verification
1. Open VS Code
2. Look for the App Modernization icon in the Activity Bar (left sidebar)
3. Verify the extension is active in the Extensions view

#### Key Features

**1. Assessment & Analysis**
- Right-click on your project folder in VS Code Explorer
- Select **"Analyze for Modernization"** or **"Run App Modernization Assessment"**
- Review the generated assessment report highlighting:
  - Incompatible APIs and deprecated packages
  - Breaking changes between framework versions
  - Migration complexity scores
  - Recommended migration paths

**2. Migration Planning**
- Use the extension to generate a comprehensive migration plan
- Identify service boundaries (for Challenge 1 - .NET migration)
- Map dependencies and breaking changes
- Get AI-powered recommendations for refactoring

**3. Code Transformation**
- Select code sections that need modernization
- Right-click and choose **"Modernize with Copilot"**
- Review and apply suggested transformations:
  - Namespace updates (javax → jakarta)
  - API replacements (System.Web → ASP.NET Core)
  - Pattern modernization (callbacks → async/await)

**4. Interactive Chat**
- Open Copilot Chat (Ctrl+Alt+I or Cmd+Alt+I)
- Use specialized prompts with `@workspace` for context:
  ```
  @workspace Analyze this codebase for .NET 8 migration blockers
  
  @workspace What breaking changes exist between Java 8 and Java 17?
  
  @workspace Generate migration steps for this AngularJS component to React
  ```

**5. Validation & Testing**
- After making changes, use the extension to validate:
  - Run **"Validate Migration Completeness"**
  - Check for remaining legacy patterns
  - Verify breaking changes are resolved

#### Best Practices

✅ **Do:**
- Run assessment before starting migration
- Review AI suggestions carefully before applying
- Use `@workspace` for codebase-wide context
- Save your work frequently (commit to git)
- Test after each major transformation
- Combine with Copilot Chat for explanations

❌ **Don't:**
- Accept all suggestions blindly
- Skip testing after transformations
- Ignore build errors or warnings
- Forget to review generated migration plans

#### Workflow Example

```bash
# 1. Open project in VS Code
code challenges/01-dotnet-framework-to-dotnet8/starter-code/

# 2. Run assessment (Right-click project → Analyze for Modernization)

# 3. Review assessment report in the App Modernization panel

# 4. Use Copilot Chat for planning
@workspace Create a migration checklist for this .NET application

# 5. Start migration following challenge README

# 6. Use Copilot for transformations
# Select code → Right-click → Modernize with Copilot

# 7. Validate changes
# Right-click → Validate Migration Completeness

# 8. Build and test
dotnet build
dotnet test
```

#### Troubleshooting

**Extension not appearing?**
- Restart VS Code
- Check Extensions view for any errors
- Ensure you're signed in to GitHub Copilot

**Assessment not running?**
- Verify the project structure is correct
- Check Output panel (View → Output → GitHub Copilot App Modernization)
- Ensure the workspace folder is open (not just files)

**Suggestions not accurate?**
- Provide more context in Copilot Chat with `@workspace`
- Include specific file paths or code snippets
- Try rephrasing your prompt with more details

## 📊 Challenge Overview Table

| # | Challenge | Difficulty | Duration | Key Skills |
|---|---|---|---|---|
| 1 | .NET Framework to .NET 8 | 🔴 Advanced | 3-4 hours | ASP.NET Core, EF Core, C# 12 |
| 2 | Java 8 to 17 Migration | 🟡 Intermediate | 60-90 min | Java 17, Spring Boot 3, Jakarta EE |
| 3 | AngularJS to React | 🔴 Advanced | 4-5 hours | React Hooks, TypeScript, Modern Tooling |

## 🤝 Contributing

We welcome contributions! Here's how you can help:
- **Report Issues**: Found a bug? Open an issue.
- **Suggest Improvements**: Have ideas? Share them in discussions.
- **Add Challenges**: Create new challenges following our template.
- **Improve Documentation**: Help make instructions clearer.
- **Share Solutions**: Contribute alternative solutions to existing challenges.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
