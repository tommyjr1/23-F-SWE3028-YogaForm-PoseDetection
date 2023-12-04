package com.example.demo.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.dto.Routine;


public interface RoutineRepository extends JpaRepository<Routine, Long> {
    Routine findByRoutineName(String routineName);
    List<Routine> findByUserId(String userId);
    // Routine findByCredential(String routineName);
}