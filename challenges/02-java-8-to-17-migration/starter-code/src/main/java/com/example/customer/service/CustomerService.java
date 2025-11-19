package com.example.customer.service;

import com.example.customer.model.Customer;
import com.example.customer.model.CustomerStatus;
import com.example.customer.repository.CustomerRepository;
import com.example.customer.util.LegacyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Legacy Customer Service with old Java 8 patterns
 * 
 * Migration TODO:
 * - Use Pattern Matching for instanceof
 * - Replace traditional switch with switch expressions
 * - Improve null handling with Optional
 * - Use Text Blocks for multi-line strings
 */
@Service
public class CustomerService {
    
    @Autowired
    private CustomerRepository customerRepository;
    
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }
    
    public Customer getCustomerById(Long id) {
        // Verbose null checking (should use Optional properly)
        Customer customer = customerRepository.findById(id).orElse(null);
        if (customer == null) {
            return null;
        }
        return customer;
    }
    
    public Customer createCustomer(Customer customer) {
        // Old-style validation
        if (customer == null) {
            throw new IllegalArgumentException("Customer cannot be null");
        }
        if (customer.getFirstName() == null || customer.getFirstName().isEmpty()) {
            throw new IllegalArgumentException("First name is required");
        }
        if (customer.getEmail() == null || !LegacyUtils.isValidEmail(customer.getEmail())) {
            throw new IllegalArgumentException("Valid email is required");
        }
        
        return customerRepository.save(customer);
    }
    
    public Customer updateCustomer(Long id, Customer customerDetails) {
        Customer customer = getCustomerById(id);
        if (customer == null) {
            return null;
        }
        
        // Verbose property copying
        if (customerDetails.getFirstName() != null) {
            customer.setFirstName(customerDetails.getFirstName());
        }
        if (customerDetails.getLastName() != null) {
            customer.setLastName(customerDetails.getLastName());
        }
        if (customerDetails.getEmail() != null) {
            customer.setEmail(customerDetails.getEmail());
        }
        if (customerDetails.getPhone() != null) {
            customer.setPhone(customerDetails.getPhone());
        }
        if (customerDetails.getAddress() != null) {
            customer.setAddress(customerDetails.getAddress());
        }
        
        customer.setUpdatedAt(new Date());
        return customerRepository.save(customer);
    }
    
    public void deleteCustomer(Long id) {
        Customer customer = getCustomerById(id);
        if (customer != null) {
            customerRepository.delete(customer);
        }
    }
    
    // Traditional switch statement (should be switch expression)
    public String getStatusDescription(CustomerStatus status) {
        String description;
        switch (status) {
            case ACTIVE:
                description = "Customer account is active and in good standing";
                break;
            case INACTIVE:
                description = "Customer account is inactive";
                break;
            case SUSPENDED:
                description = "Customer account has been suspended";
                break;
            case PENDING_VERIFICATION:
                description = "Customer account is pending verification";
                break;
            default:
                description = "Unknown status";
                break;
        }
        return description;
    }
    
    // Verbose collection processing (could use streams better)
    public List<Customer> getActiveCustomers() {
        List<Customer> allCustomers = customerRepository.findAll();
        List<Customer> activeCustomers = new ArrayList<>();
        
        for (Customer customer : allCustomers) {
            if (customer.getStatus() == CustomerStatus.ACTIVE) {
                activeCustomers.add(customer);
            }
        }
        
        return activeCustomers;
    }
    
    // Old instanceof checking (should use pattern matching)
    public String processCustomerData(Object data) {
        if (data instanceof String) {
            String str = (String) data;
            return "Processing string: " + str.toUpperCase();
        } else if (data instanceof Integer) {
            Integer num = (Integer) data;
            return "Processing number: " + (num * 2);
        } else if (data instanceof Customer) {
            Customer customer = (Customer) data;
            return "Processing customer: " + customer.getFullName();
        } else {
            return "Unknown data type";
        }
    }
    
    // Legacy multi-line string (should use text blocks)
    public String generateCustomerReport(Customer customer) {
        String report = "{\n" +
                "  \"customerId\": " + customer.getId() + ",\n" +
                "  \"name\": \"" + customer.getFullName() + "\",\n" +
                "  \"email\": \"" + customer.getEmail() + "\",\n" +
                "  \"status\": \"" + customer.getStatus() + "\",\n" +
                "  \"createdAt\": \"" + customer.getCreatedAt() + "\"\n" +
                "}";
        return report;
    }
}
