package com.example.aiAutomation.controller;

import com.example.aiAutomation.entity.RawJsonData;
import com.example.aiAutomation.repository.RawJsonRepository;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/data")
public class RawJsonController {

    @Autowired
    private RawJsonRepository repository;
     @GetMapping("/test-get")
    public String test() {
        return "GET works!";
    }

    @GetMapping("/raw")
    public String getRawJson() {
        RawJsonData data = repository.findAll().stream().findFirst().orElse(null);
        return data != null ? data.getJsonData() : "No data found";
    }
    @PostMapping
    public String saveRawJson(@RequestBody JsonNode payload) {
        RawJsonData entity = new RawJsonData();
        entity.setJsonData(payload.toString());
        repository.save(entity);
        return "Saved!";
    }
}
