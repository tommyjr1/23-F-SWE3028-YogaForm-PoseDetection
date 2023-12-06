package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.demo.dao.PoseRepository;
import com.example.demo.entity.Pose;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PoseService {

    private final PoseRepository poseRepository;

    public Pose getPosebyName(String name){

        Pose pose = poseRepository.findByName(name);
        return pose;   
    }

    public void saveAll(List<Pose> poses){
        for (Pose pose: poses){
            poseRepository.save(pose);
        }
    }

    public List<String> getAll(){
        List<Pose> poses = poseRepository.findAll();
        List<String> poseNames = new ArrayList<>();
        for (Pose pose: poses){
            poseNames.add(pose.getName());
        }
        return poseNames;
    }


}
