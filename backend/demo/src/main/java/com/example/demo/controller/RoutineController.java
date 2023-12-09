package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.RoutineDto;
import com.example.demo.entity.Routine;
import com.example.demo.service.JwtTokenProvider;
import com.example.demo.service.RoutineService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/yf/routine")

public class RoutineController {

    @Autowired
    RoutineService routineService;
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    private static final ObjectMapper mapper = new ObjectMapper();


    @GetMapping("")
    public List<String> getRoutineName(HttpServletRequest request){
        List<String> routines = routineService.getUserRoutines(request);
        return routines;

    }

    @GetMapping("/{routineName}")
    public String getRoutinePoses(@PathVariable("routineName") String routineName){
        Routine routine = routineService.getByRoutineName(routineName);
        return routine.getPoses();
    }


    @ResponseBody
    @PostMapping("/secure/addRoutines")
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
    @PostMapping("/secure/addRoutine")
    public void postAddRoutine(@RequestBody RoutineDto routineDto, HttpServletRequest request){
        routineService.addRoutine(routineDto, request);
        return;
    }
    
}
