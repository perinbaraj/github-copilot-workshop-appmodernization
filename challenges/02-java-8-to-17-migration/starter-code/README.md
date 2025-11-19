# Customer API - Legacy Java 8

This is a legacy customer management REST API that needs migration to Java 17 and Spring Boot 3.x.

## Current Technology Stack

- Java 8
- Spring Boot 2.1.0
- javax.* packages
- JUnit 4
- Old date/time APIs (java.util.Date)
- Traditional POJOs with verbose getters/setters

## Target Technology Stack

- Java 17
- Spring Boot 3.x
- jakarta.* packages
- JUnit 5
- Modern date/time APIs (java.time.*)
- Records, Sealed Classes, Pattern Matching

## Running the Application

```bash
mvn clean install
mvn spring-boot:run
```

The application runs on http://localhost:8082

## API Endpoints

### Customers
- GET    /api/customers - Get all customers
- GET    /api/customers/{id} - Get customer by ID
- GET    /api/customers/active - Get active customers
- GET    /api/customers/{id}/report - Get customer report
- POST   /api/customers - Create customer
- PUT    /api/customers/{id} - Update customer
- DELETE /api/customers/{id} - Delete customer

## Code Patterns Needing Migration

### 1. POJOs → Records
- `Customer` class has many getters/setters
- `Address` is immutable - perfect for Record

### 2. Date → LocalDateTime
- All `java.util.Date` usage
- SimpleDateFormat → DateTimeFormatter

### 3. javax.* → jakarta.*
- `javax.persistence.*`
- `javax.validation.*`

### 4. Traditional Switch → Switch Expressions
- See `getStatusDescription()` method

### 5. instanceof → Pattern Matching
- See `processCustomerData()` method

### 6. Multi-line Strings → Text Blocks
- See `generateCustomerReport()` method

### 7. Verbose Null Checks → Optional
- Multiple methods with if-null patterns

### 8. JUnit 4 → JUnit 5
- Test classes need migration

## Your Mission

Use GitHub Copilot to:
1. Migrate to Java 17 and Spring Boot 3.x
2. Convert appropriate classes to Records
3. Modernize all date/time handling
4. Update javax to jakarta
5. Apply pattern matching and switch expressions
6. Use text blocks for multi-line strings
7. Improve null handling with Optional
8. Upgrade tests to JUnit 5
