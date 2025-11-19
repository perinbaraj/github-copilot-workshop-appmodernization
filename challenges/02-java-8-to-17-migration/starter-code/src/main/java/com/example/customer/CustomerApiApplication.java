package com.example.customer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Legacy Customer Management API - Java 8
 * 
 * This application needs migration to:
 * - Java 17
 * - Spring Boot 3.x
 * - Modern Java features (Records, Sealed Classes, Pattern Matching)
 * - jakarta.* namespace
 */
@SpringBootApplication
public class CustomerApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerApiApplication.class, args);
    }
}
