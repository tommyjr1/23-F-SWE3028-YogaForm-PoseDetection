package com.example.demo.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.datatype.Login;

@RestController
public class UserController {
    
    
    @PostMapping("/api/login")
    public void postLogin(@RequestBody Login login){
        System.out.println(login);
        
    }

    

}