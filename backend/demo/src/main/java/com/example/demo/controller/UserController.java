package com.example.demo.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.Login;

@RestController
public class UserController {
    
    
    @PostMapping("/yf/user/login")
    public void postLogin(@RequestBody Login login){
        System.out.println(login);
        
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