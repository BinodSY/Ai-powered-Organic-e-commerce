package com.example.aiAutomation.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.aiAutomation.entity.Contact;
import com.example.aiAutomation.service.ContactService;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "*") // Allow requests from your React frontend
public class ContactController {
    @Autowired
    private ContactService contactService;

    // @GetMapping
    // public ResponseEntity<String> getallConatact(){

    // }

    @PostMapping
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
        Contact savedContact = contactService.saveContact(contact);
        return ResponseEntity.ok(savedContact);
    }
}
