package com.example.aiAutomation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.aiAutomation.entity.RawJsonData;

public interface RawJsonRepository extends JpaRepository<RawJsonData, Long> {
}
