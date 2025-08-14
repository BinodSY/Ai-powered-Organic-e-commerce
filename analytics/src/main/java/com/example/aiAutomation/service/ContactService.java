package com.example.aiAutomation.service;

import com.example.aiAutomation.entity.Contact;
import com.example.aiAutomation.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    @Autowired
    private  ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }
    public ContactService() {
    }

    public Contact saveContact(Contact contact) {
        return contactRepository.save(contact);
    }
}
