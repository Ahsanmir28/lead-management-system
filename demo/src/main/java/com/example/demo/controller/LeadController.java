package com.example.demo.controller;

import com.example.demo.model.Lead;
import com.example.demo.service.LeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/leads")
public class LeadController {
    
    private final LeadService leadService;
    
    @Autowired
    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }
    
    @GetMapping
    public ResponseEntity<List<Lead>> getAllLeads() {
        List<Lead> leads = leadService.getAllLeads();
        return new ResponseEntity<>(leads, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Lead> getLeadById(@PathVariable Long id) {
        return leadService.getLeadById(id)
                .map(lead -> new ResponseEntity<>(lead, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @PostMapping
    public ResponseEntity<Lead> createLead(@RequestBody Lead lead) {
        if (lead.getName().equals("") || lead.getEmail().equals("") || lead.getPhone().equals("") || lead.getPhone().equals("")) 
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        Lead newLead = leadService.createLead(lead);
        return new ResponseEntity<>(newLead, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Lead> updateLead(@PathVariable Long id, @RequestBody Lead lead) {
        if (lead.getName().equals("") || lead.getEmail().equals("") || lead.getPhone().equals("") || lead.getPhone().equals("")) 
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return leadService.updateLead(id, lead)
                .map(updatedLead -> new ResponseEntity<>(updatedLead, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}