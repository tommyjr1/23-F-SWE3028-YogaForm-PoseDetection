package com.example.demo.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.user.Routine;
import com.example.demo.repository.RoutineRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RoutineService {

    private final RoutineRepository routineRepository;

    public Routine getByRoutineName(String routineName){
        Routine routine = routineRepository.findByRoutineName(routineName);
        return routine;
    }

    public void saveAll(List<Routine> routines){
        for (Routine routine: routines){
            routineRepository.save(routine);
        }
    }
    
}
