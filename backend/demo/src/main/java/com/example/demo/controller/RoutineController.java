package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Routine;
import com.example.demo.service.RoutineService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class RoutineController {

    @Autowired
    RoutineService routineService;

    private static final ObjectMapper mapper = new ObjectMapper();
    private String userId="";


    @GetMapping("/yf/routine/")
    public List<String> getRoutine(){
        List<String> routines = routineService.getUserRoutines(userId);
        return routines;

    }

    @GetMapping("/yf/routine/{routineName}")
    public String getRoutine(@PathVariable("routineName") String routineName){
        System.out.println(routineName);        
        Routine routine = routineService.getByRoutineName(routineName);
        return routine.getPoses();
    }


    @ResponseBody
    @PostMapping("/yf/routine/addRoutines")
    public void postAddRoutines(@RequestBody String routines){
        
        List<Routine> routine1 = new ArrayList<>();
        try {
            routine1 = mapper.readValue(routines, new TypeReference<List<Routine>>() {});
        } catch (JsonProcessingException e) {};
        System.out.println(routine1.size());

        routineService.saveAll(routine1);
        return;
    }

    @ResponseBody
    @PostMapping("/yf/routine/addRoutine")
    public void postAddRoutine(@RequestBody Routine routine){
        System.out.println(routine);
        routineService.saveRoutine(routine);
    }
    
}
