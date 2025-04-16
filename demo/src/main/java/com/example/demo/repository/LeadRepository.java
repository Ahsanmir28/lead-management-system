package com.example.demo.repository;

import com.example.demo.model.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
    // Spring Data JPA will automatically implement basic CRUD operations
}