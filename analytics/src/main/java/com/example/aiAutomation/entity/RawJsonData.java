package com.example.aiAutomation.entity;

import jakarta.persistence.*;
// import java.time.LocalDateTime;
import lombok.Data;

// import jakarta.persistence.*;
// import com.fasterxml.jackson.databind.JsonNode;

@Data
@Entity
public class RawJsonData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "JSON") // or TEXT if DB doesn't support JSON type
    private String jsonData;

    // getters and setters
}
