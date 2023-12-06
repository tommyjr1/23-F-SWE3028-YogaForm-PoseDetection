package com.example.demo.controller;

import java.io.File;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.dto.AngleDto;
import com.example.demo.dto.JointsDto;
import com.example.demo.dto.LandmarkDto;
import com.example.demo.entity.Pose;
import com.example.demo.service.CoachService;
import com.example.demo.service.PoseService;
import com.example.demo.tts.Tts;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class CoachController {

    @Autowired
    CoachService coachService;
    PoseService poseService;

    private List<LandmarkDto> landmark1 = new ArrayList<>();

    private static final ObjectMapper mapper = new ObjectMapper();
    private JointsDto currentJoints;
    private JointsDto newJoints;
    private Pose currentPose;
    private String feedback;
    private Long checkTime = (long) 0;
    private Object[] results;


    @ResponseBody
    @PostMapping("/yf/pose/angle")
    public boolean postData(@RequestBody AngleDto angle) throws Exception {

        // System.out.println(angle.toString());

        String values = angle.getValue();
        // System.out.println(values);

        landmark1 = null;
        try {
            landmark1 = mapper.readValue(values, new TypeReference<List<LandmarkDto>>() {});
            newJoints = coachService.calculateAll(landmark1);

            return true ;

        } catch (JsonProcessingException e) {
            return false;
        }

        
    }
    
    @ResponseBody
    @GetMapping("yf/pose/feedback/{poseName}")
    public ResponseEntity getData(@PathVariable("poseName") String poseName) throws Exception {
        boolean sendFeeadback=false;
        ResponseEntity<byte[]> response = ResponseEntity.noContent().build();
        System.out.println("Feedback: "+poseName);

        long curTime = System.currentTimeMillis(); 
        if (checkTime==(long)0 || ((curTime-checkTime)/1000)<10){
            if(checkTime==(long)0){
                checkTime = System.currentTimeMillis();
            }
            return response ;
        }

        if(currentJoints!=null)
        {
            sendFeeadback = coachService.compareAngles(currentJoints, newJoints);

            if (sendFeeadback){
                currentPose = poseService.getPosebyName(poseName);
                results = coachService.comparePose(currentPose, currentJoints);
                System.out.println(results.toString());

                System.out.println(results[0].toString());

                Tts.main(results[0].toString());
                File f = new File("/home/ubuntu/yogaform/23-F-SWE3028-YogaForm/backend/demo/output.mp3");
                byte[] file = Files.readAllBytes(f.toPath());

                HttpHeaders headers = new HttpHeaders();
                headers.set("Content-Disposition", "attachment; filename=\"" + f.getName() +".wav\"");
                response = new ResponseEntity(file, headers, HttpStatus.OK);
                checkTime = System.currentTimeMillis();
            }
        }
        currentJoints=newJoints;
        return response ;
    }

    @GetMapping("/yf/pose/pass/{poseName}")
    public Double getPass(@PathVariable("poseName") String poseName){
        if(results[0].toString()=="Good job."){ return (Double) results[1];}
        else{ return -1.0;}
    }

    
}
