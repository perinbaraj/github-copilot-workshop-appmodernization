# Copilot Prompts: Java 8 to 17 Migration

Comprehensive GitHub Copilot prompts for migrating the Customer API from Java 8 to Java 17 with Spring Boot 3.x.

## 🔍 Phase 1: Pre-Migration Analysis

### Impact Assessment
```
@workspace Analyze this Java 8 application for migration to Java 17

@workspace List all deprecated APIs and their modern alternatives

@workspace What breaking changes should I expect when upgrading to Spring Boot 3.x?

@workspace Show me all uses of java.util.Date that need to be migrated

@workspace Identify all javax.* imports that need to change to jakarta.*
```

### Dependency Analysis
```
@workspace Which Maven dependencies need version updates for Java 17?

Generate a complete pom.xml for Spring Boot 3.2 with Java 17

What new dependencies are required for Spring Boot 3.x?
```

## ⚙️ Phase 2: Build Configuration

### Maven Updates
```
Update this pom.xml to Java 17 and Spring Boot 3.2.x

Change all javax dependencies to jakarta equivalents

Update Spring Boot parent version and all related dependencies

Add maven-compiler-plugin configuration for Java 17
```

### Dependency Resolution
```
Fix version conflicts between Spring Boot 3.x dependencies

Update all deprecated dependency declarations

Add necessary exclusions for transitive dependencies
```

## 🔧 Phase 3: Package Namespace Changes

### javax → jakarta Migration
```
@workspace Replace all javax.persistence imports with jakarta.persistence

@workspace Convert all javax.validation annotations to jakarta.validation

Bulk replace javax.* with jakarta.* in all files

Update import statements in Customer entity for jakarta namespace
```

### Verification
```
@workspace Find any remaining javax.* imports

Check for indirect javax dependencies through libraries
```

## 🎯 Phase 4: Convert POJOs to Records

### Customer Class
```
Convert the Customer class to a Java 17 record while keeping JPA annotations

How do I handle mutable fields in a record with JPA?

Create a record for Customer with builder pattern support

Generate validation annotations for Customer record fields
```

### Address Class
```
Convert Address class to a Java 17 record

This immutable class is perfect for a record - refactor it

Add validation to the Address record using jakarta.validation
```

### DTOs
```
Create record-based DTOs for Customer API requests and responses

Generate CustomerRequest and CustomerResponse records

Add JSON serialization annotations to Customer records
```

## 🔄 Phase 5: Pattern Matching

### instanceof Improvements
```
Refactor this instanceof chain in processCustomerData to use pattern matching

Convert these type checks to use Java 17 pattern matching for instanceof

Simplify this code using pattern matching switch (Java 21 preview)
```

### Examples
```
# Before
if (obj instanceof String) {
    String s = (String) obj;
    // use s
}

# Refactor to:
if (obj instanceof String s) {
    // use s directly
}
```

## 🔀 Phase 6: Switch Expressions

### Traditional Switch → Modern Switch
```
Convert getStatusDescription method to use switch expressions

Refactor this switch statement to return directly using expressions

Modernize this switch to use arrow syntax and return values
```

### Pattern Matching Switch
```
Use pattern matching in switch for type checking

Implement exhaustiveness checking with sealed types and switch
```

## 📝 Phase 7: Text Blocks

### Multi-line Strings
```
Convert generateCustomerReport to use text blocks

Refactor this JSON string to use Java 17 text blocks

Replace string concatenation with text blocks for readability
```

### Examples
```
# Before
String json = "{\n" +
              "  \"name\": \"" + name + "\"\n" +
              "}";

# Refactor to text block with STR templates (Java 21)
```

## 📅 Phase 8: Date/Time API Migration

### Date → LocalDateTime
```
@workspace Replace all java.util.Date with java.time.LocalDateTime

Convert Date fields in Customer entity to LocalDateTime

Update @Temporal annotations for LocalDateTime

Refactor SimpleDateFormat to DateTimeFormatter
```

### Time Handling
```
Convert this Date manipulation to use LocalDateTime

Replace Calendar usage with LocalDateTime API

Modernize date arithmetic using Period and Duration
```

## ⚡ Phase 9: Stream API & Optional

### Collection Processing
```
Refactor getActiveCustomers to use Stream API efficiently

Convert this for-loop to streams with filter and collect

Use Optional properly in getCustomerById method

Replace null checks with Optional.ofNullable and map
```

### Null Safety
```
@workspace Improve null handling using Optional throughout the service

Refactor verbose if-null checks to use Optional methods

Convert this method to return Optional instead of null
```

## 🧪 Phase 10: Test Modernization

### JUnit 4 → JUnit 5
```
@workspace Migrate all JUnit 4 tests to JUnit 5

Convert @Test annotations and assertion methods

Replace @Before/@After with @BeforeEach/@AfterEach

Update test dependencies in pom.xml for JUnit 5
```

### Modern Test Patterns
```
Generate @ParameterizedTest for testing multiple scenarios

Create @Nested test classes for better organization

Add @DisplayName annotations for readable test names

Use AssertJ for fluent assertions
```

## 🔐 Phase 11: Security Updates

### Spring Security 6
```
Update Spring Security configuration for Spring Boot 3.x

Migrate WebSecurityConfigurerAdapter to SecurityFilterChain

Update authentication and authorization patterns

Configure CORS and CSRF for Spring Security 6
```

## 🚀 Phase 12: Performance Improvements

### Virtual Threads (Project Loom)
```
Implement virtual threads for I/O-bound operations

Configure thread pools to use virtual threads

Optimize blocking operations with virtual threads
```

### HttpClient
```
Replace RestTemplate with Java 17 HttpClient

Implement async HTTP calls using HttpClient

Add connection pooling and timeouts to HttpClient
```

## 📊 Phase 13: Validation & Testing

### Build Verification
```
Ensure the application compiles with Java 17

Run all tests and fix any failures

Verify no warnings about deprecated APIs

Check for any runtime issues with the new Java version
```

### Integration Testing
```
Generate integration tests for migrated endpoints

Test date/time handling with LocalDateTime

Verify Record serialization/deserialization

Test pattern matching and switch expressions
```

## 🎓 Advanced Features

### Sealed Classes
```
Convert CustomerStatus enum to a sealed interface hierarchy

Create sealed classes for payment types

Implement exhaustive pattern matching with sealed classes
```

### Modern APIs
```
Use HttpClient instead of RestTemplate for external calls

Implement CompletableFuture for async operations

Use ProcessHandle for process management

Leverage new Collection factory methods
```

## 💡 Pro Tips for Copilot Usage

### Effective Prompting
```
# Be specific about versions
"Update to Spring Boot 3.2.0 with Java 17"

# Request complete solutions
"Convert Customer class to record with JPA annotations and validation"

# Ask for explanations
"Why does this code fail in Java 17 and how to fix it?"

# Batch operations
"@workspace Show all classes that can be converted to records"

# Include context
"Given this is a JPA entity, convert to record maintaining persistence"
```

### Iterative Improvement
```
"Improve this code using Java 17 features"
"Make this more idiomatic for Java 17"
"Add error handling and logging to this modern code"
"Generate tests for this Java 17 implementation"
```

### Documentation
```
"Generate JavaDoc explaining the Java 17 features used"
"Create migration notes documenting breaking changes"
"Write README section explaining new Java 17 patterns"
```

## 🔍 Common Issues & Solutions

| Issue | Copilot Prompt |
|-------|----------------|
| javax imports | `@workspace Replace all javax.* with jakarta.*` |
| Date handling | `Convert all Date fields to LocalDateTime` |
| Switch statements | `Modernize to switch expressions` |
| Verbose POJOs | `Convert immutable classes to records` |
| instanceof casting | `Use pattern matching for instanceof` |
| Multi-line strings | `Refactor to text blocks` |
| Null checks | `Improve with Optional` |
| RestTemplate | `Replace with HttpClient` |
| JUnit 4 tests | `Migrate to JUnit 5` |
