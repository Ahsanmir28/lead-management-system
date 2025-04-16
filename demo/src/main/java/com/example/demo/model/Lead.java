package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Lead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String full_name;
    @Column(unique = true)
    private String email;
    private String phone;
    private String company_name;
    private String notes;
    private LocalDateTime created_at;

    public Lead() {
        this.created_at = LocalDateTime.now();
    }
    
    public Lead(String name, String email, String phone, String company_name, String notes) {
        this.full_name = name;
        this.email = email;
        this.phone = phone;
        this.company_name = company_name;
        this.notes = notes;
        this.created_at = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return full_name;
    }
    
    public void setName(String name) {
        this.full_name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCompany_name() {
        return company_name;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }
}