# Challenge 2: Java 8 to Java 17 Migration with Spring Boot 3.x Upgrade

**Difficulty:** 🟡 Intermediate | **Duration:** 60-90 minutes

## 🎯 Goal

Migrate a legacy Java 8 application with Spring Boot 2.1 to Java 17 with Spring Boot 3.x using **GitHub Copilot App Modernization extension** to identify breaking changes, fix deprecated APIs, and adopt modern Java features.

## 📋 Scenario

Your team maintains a customer management REST API built with Java 8 and Spring Boot 2.1. The application uses:
- Old date/time APIs (java.util.Date)
- Verbose null-checking patterns
- Traditional switch statements
- POJOs with boilerplate getters/setters
- Deprecated Spring annotations
- Java EE dependencies (javax.*)

The business requires:
- Migration to Java 17 LTS for long-term support
- Spring Boot 3.x for latest security patches
- Modern code patterns for maintainability
- Performance improvements from new JVM features

## 🚀 Instructions

### Part 1: Pre-Migration Analysis (10-15 minutes)

1. **Open the starter application** and review the codebase
2. **Use Copilot Chat** for impact analysis:
   ```
   @workspace Analyze this Java 8 application for migration to Java 17
   
   @workspace What breaking changes should I expect when upgrading to Spring Boot 3.x?
   
   @workspace List all deprecated APIs and suggest modern alternatives
   ```
3. **Document findings** - Ask Copilot to create a migration checklist

### Part 2: Update Build Configuration (10 minutes)

1. **Update `pom.xml` with Copilot's help**:
   ```
   Update this pom.xml to Java 17 and Spring Boot 3.2.x with all necessary dependency changes
   ```
2. **Fix javax to jakarta namespace changes**
3. **Update dependency versions** for compatibility

### Part 3: Fix Breaking Changes (20-25 minutes)

1. **Resolve compilation errors** using Copilot:
   - javax.* → jakarta.* package renames
   - Removed APIs (e.g., finalize())
   - Updated Spring Security configurations
   
2. **Use Copilot prompts**:
   ```
   Fix these compilation errors for Java 17 compatibility
   
   Update this Spring Security configuration for Spring Boot 3.x
   
   Replace javax.validation with jakarta.validation annotations
   ```

### Part 4: Modernize Code with Java 17 Features (25-30 minutes)

#### A. Convert POJOs to Records
```
Convert this Customer class to a Java 17 record

Generate builder pattern for this record class
```

#### B. Implement Sealed Classes
```
Refactor this class hierarchy to use sealed classes

Create a sealed interface for payment types with permitted subclasses
```

#### C. Use Pattern Matching
```
Refactor this instanceof chain to use pattern matching for instanceof

Simplify this switch statement using enhanced switch expressions
```

#### D. Adopt Text Blocks
```
Convert this multi-line string to a text block

Refactor this JSON string to use text blocks
```

#### E. Use Optional and Stream APIs
```
Refactor these null checks to use Optional

Improve this collection processing with Stream API
```

### Part 5: Performance & Modern Practices (10-15 minutes)

1. **Use Copilot to implement**:
   - HTTP Client (replace RestTemplate)
   - Virtual Threads (Project Loom) for I/O operations
   - Improved exception handling

2. **Prompts to use**:
   ```
   Replace this RestTemplate code with Java 17 HttpClient
   
   Implement virtual threads for this blocking I/O operation
   
   Add proper try-with-resources for this code
   ```

### Part 6: Update Tests (10-15 minutes)

1. **Modernize test code** with Copilot:
   ```
   Update these JUnit 4 tests to JUnit 5
   
   Generate test cases for the new record classes
   
   Add @ParameterizedTest for these test scenarios
   ```

## 🛠️ Using GitHub Copilot App Modernization Extension

### Key Features to Leverage:

1. **Migration Scanner**
   - Right-click project → "Analyze for Java Version Migration"
   - Get automated breaking change detection

2. **Code Modernization Suggestions**
   - Inline suggestions for converting to records
   - Automatic detection of patterns that can use pattern matching
   - Suggestions for sealed classes where appropriate

3. **Dependency Update Recommendations**
   - Identify outdated dependencies
   - Suggest compatible versions for Java 17

4. **Refactoring Assistant**
   - Bulk refactoring for package renames (javax → jakarta)
   - Automated conversion of deprecated APIs
   - Smart suggestions for modern alternatives

## ✅ Completion Criteria

- [ ] Application successfully compiles and runs on Java 17
- [ ] Spring Boot upgraded to 3.x with all dependencies updated
- [ ] At least 3 POJOs converted to records
- [ ] Implemented at least 1 sealed class/interface
- [ ] Used pattern matching for instanceof in at least 2 places
- [ ] Switch expressions used instead of traditional switch statements
- [ ] Text blocks used for multi-line strings
- [ ] All javax.* packages replaced with jakarta.*
- [ ] Tests updated and passing
- [ ] Application performance baseline documented

## 🎓 Learning Outcomes

By completing this challenge, you will:
- Master Java 17 language features with AI assistance
- Learn to use Copilot for large-scale refactoring
- Understand Spring Boot 3.x migration patterns
- Apply modern Java coding practices
- Use AI to identify and fix breaking changes
- Leverage Copilot for test modernization

## 📚 Helpful Copilot Prompts

```
@workspace Show me all classes that can be converted to records

@workspace Find all Date usages and suggest LocalDateTime alternatives

@workspace Identify opportunities for using sealed classes

@workspace Refactor this code to use pattern matching and switch expressions

Generate a migration guide document for this Java 8 to 17 upgrade

Create a performance comparison between Java 8 and Java 17 implementations

Add comprehensive JavaDoc comments explaining the new Java 17 features used

Generate integration tests for the migrated REST endpoints
```

## 🔍 Common Migration Issues & Copilot Solutions

| Issue | Copilot Prompt |
|-------|----------------|
| javax → jakarta | `Bulk replace javax.* with jakarta.* in this file` |
| Date → LocalDateTime | `Convert Date fields to LocalDateTime with proper formatting` |
| Verbose getters/setters | `Convert this POJO to a Java record` |
| Traditional switch | `Modernize this switch to use expressions` |
| Null checks | `Refactor to use Optional instead of null checks` |
| RestTemplate deprecated | `Replace RestTemplate with HttpClient` |
