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

import com.example.demo.dto.Login;
import com.example.demo.dto.user.Routine;
import com.example.demo.service.RoutineService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class UserController {

    @Autowired
    RoutineService routineService;
    
    private String credential="";
    private List<Routine> routine1 = new ArrayList<>();
    private static final ObjectMapper mapper = new ObjectMapper();
    
    @PostMapping("/yf/user/login")
    public void postLogin(@RequestBody Login login){
        credential = login.getCredential();
        System.out.println(login);
        
    }

    @GetMapping("/yf/user/routine/{name}")
    public String getRoutine(@PathVariable("name") String name){
        System.out.println(name);
        Routine routine;
        if (!name.startsWith("default")){
            name = credential+"_"+name;
        }
        routine = routineService.getByRoutineName(name);
        
        return routine.getPoses();

    }

    @ResponseBody
    @PostMapping("/yf/user/addRoutines")
    public void postAddRoutines(@RequestBody String routines){
        
        routine1 = null;
        try {
            routine1 = mapper.readValue(routines, new TypeReference<List<Routine>>() {});
        } catch (JsonProcessingException e) {};
        System.out.println(routine1.size());

        routineService.saveAll(routine1);

    }

    // // 저장
    // private final UserInfoRepository userInfoRepository;
    // UserInfo userInfo = new UserInfo();


    // private Long id;
    // userInfoRepository.save();

    // // 조회 findById
    // Optional<UserInfo> optionalUserInfo = userInfoRepository.findById(id);
    // UserInfo findUserInfo = optionalUserInfo.get();

    // // 조회 findAll
    // List<UserInfo> userInfos = userInfoRepository.findAll();

    // // 수정
    // userInfo = userInfoRepository.findById(id).get();
    // userInfo.setName(newName);
    // userInfoRepository.save(userInfo);

    // // 삭제
    // userInfoRepository.delete(userInfo);

}