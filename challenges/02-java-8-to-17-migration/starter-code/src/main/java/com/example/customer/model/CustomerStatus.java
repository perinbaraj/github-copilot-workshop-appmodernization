package com.example.customer.model;

/**
 * Customer Status Enum
 * 
 * Migration TODO:
 * - Consider using Sealed Class hierarchy for type-safe status handling
 */
public enum CustomerStatus {
    ACTIVE,
    INACTIVE,
    SUSPENDED,
    PENDING_VERIFICATION
}
