package com.example.demo.service;

import com.example.demo.model.Lead;
import com.example.demo.repository.LeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeadService {

    private final LeadRepository leadRepository;

    @Autowired
    public LeadService(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    public Optional<Lead> getLeadById(Long id) {
        return leadRepository.findById(id);
    }

    public Lead createLead(Lead lead) {
        return leadRepository.save(lead);
    }

    public Optional<Lead> updateLead(Long id, Lead leadDetails) {
        return leadRepository.findById(id).map(existingLead -> {
            existingLead.setName(leadDetails.getName());
            existingLead.setEmail(leadDetails.getEmail());
            existingLead.setPhone(leadDetails.getPhone());
            existingLead.setCompany_name(leadDetails.getCompany_name());
            existingLead.setNotes(leadDetails.getNotes());
            return leadRepository.save(existingLead);
        });
    }

    public void deleteLead(Long id) {
        leadRepository.deleteById(id);
    }
}