package com.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.dto.user.Routine;

public interface RoutineRepository extends JpaRepository<Routine, Long> {
    Routine findByRoutineName(String routineName);
    // Routine findByCredential(String routineName);
}