package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

import main.java.com.example.demo.datatype.Angle;


@RestController
public class ApiController {
    // @Autowired
    // private AngleService angleService;

    // public ApiController(AngleService angleService) {
    //     this.angleService = angleService;
    // }

    private String checkVal = "none";
    private Angle preangle = new Angle();



    @GetMapping("/api/check")
    public String getCheck(){
        return checkVal;
    }
    @ResponseBody
    @PostMapping("/api/angle")
    public void postData(@RequestBody Angle angle){

        System.out.println(angle);
        // 팔이면 팔 다리면 다리 확인해야함
        // preangle = angle;
        preangle.setValue(angle.getValue());
        System.out.println(preangle);
        //이걸 동시에 전부 확인해야하는 캬..
        checkVal = "none";

        if(angle.getValue()!=null){
            Double val = Double.valueOf(angle.getValue());
            System.out.println(val);
            //angle 위치에 따라 자세에 따라 correct 포즈 다를것임;;
            Double correctValue = 180.0;
            Double minval = correctValue*0.95;
            Double maxval = correctValue*1.05;
            String returnVal="correct pose";
            returnVal = (maxval < val) ? "Too straight" : "Correct Pose";
            returnVal = (minval > val) ? "Too curved" : "Correct Pose";

            checkVal = returnVal;
            // checkVal = angleService.checkAngle(preangle);
            // preangle.setCheck(checkVal);
        }

        
    }
}