package com.example.demo.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Pose;
import com.example.demo.service.PoseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/yf/pose")
public class PoseController {

    private List<Pose> pose1 = new ArrayList<>();
    private List<String> poseNames = new ArrayList<>();

    private static final ObjectMapper mapper = new ObjectMapper();


    @Autowired
    PoseService poseService;

    @GetMapping("/getName")
    public List<String> getPoses(){
        poseNames = poseService.getAll();
        return poseNames;
    }

    @GetMapping("/getImg/{poseName}")
    public ResponseEntity getImg(@PathVariable("poseName") String poseName) throws IOException{
        // if (poseName=="")
        // Pose currentPose = poseService.getPosebyName(poseName);
        // File image = File("/home/ubuntu/yogaform/23-F-SWE3028-YogaForm/backend/demo/src/main/resources/static/poses/"+ poseName +".png");

        String path = "/home/ubuntu/yogaform/23-F-SWE3028-YogaForm/backend/demo/src/main/resources/static/poses/"+ poseName +".png";
        final ByteArrayResource inputStream = new ByteArrayResource(Files.readAllBytes(Paths.get(path)));
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentLength(inputStream.contentLength())
                .body(inputStream);

    }

    @ResponseBody
    @PostMapping("/addPose")
    public void postAddPose(@RequestBody String poses){

        pose1 = null;
        try {
            pose1 = mapper.readValue(poses, new TypeReference<List<Pose>>() {});
        } catch (JsonProcessingException e) {};
        System.out.println(pose1.size());

        poseService.saveAll(pose1);

        // for (Pose pose: pose1){
        //     poseRepository.save(pose);
        // }

    }

    

}