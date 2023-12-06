package com.example.demo.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Routine;


public interface RoutineRepository extends JpaRepository<Routine, Long> {
    Routine findByRoutineName(String routineName);
    List<Routine> findByUserEmail(String userEmail);
    // Routine findByCredential(String routineName);
}