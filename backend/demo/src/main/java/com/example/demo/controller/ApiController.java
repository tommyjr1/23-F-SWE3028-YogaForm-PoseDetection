package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {

    @GetMapping("/api/angle")
    public void getData(@RequestParam String angle){
        System.out.println(angle);
    }
    @PostMapping("/api/angle")
    public void postData(@RequestBody String angle){
        System.out.println(angle);
    }
    // public HashMap hello() {
    //     HashMap result = new HashMap();
    //     result.put("message", "안녕하세요");

    //     return result;
    // }

    //     @GetMapping("/board/insert")
    // public void boardinsert(@RequestParam Integer id, @RequestParam String title){
    //     System.out.println(id);
    //     System.out.println(title);
    // }
    // }

    // @RequestMapping(value="/testValue", method = RequestMethod.GET)
    // public String getTestValue(){
    //     String TestValue = "레스트컨트롤러 테스트";
    //     return TestValue;
    // }
}