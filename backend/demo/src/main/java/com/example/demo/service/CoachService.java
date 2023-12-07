package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.JointsDto;
import com.example.demo.dto.LandmarkDto;
import com.example.demo.entity.Pose;

import lombok.RequiredArgsConstructor;


@Service
@Transactional
@RequiredArgsConstructor
public class CoachService {

    public List<LandmarkDto> landmarkArray = new ArrayList<>();

    public Double calculateEach(Integer one, Integer two, Integer three){
        LandmarkDto zero = new LandmarkDto(0.0, 0.0, 0.0, 0.0);
        LandmarkDto a =  (landmarkArray.get(one)!=null) ? landmarkArray.get(one) : zero;
        LandmarkDto b =  (landmarkArray.get(two)!=null) ? landmarkArray.get(two) : zero;
        LandmarkDto c =  (landmarkArray.get(three)!=null) ? landmarkArray.get(three) : zero;

        // Landmark a = landmarkArray.get(one);          
        // Landmark b = landmarkArray.get(two);
        // Landmark c = landmarkArray.get(three);

        // if(a==null){a=zero;}
        // if(b==null){b=zero;}
        // if(c==null){c=zero;}

        // System.out.println("one: "+ landmarkArray.get(one).toString());
        // System.out.println("b: "+b.toString());
        // System.out.println(c);

        // // Calculate the dot product and the magnitudes of the vectors
        // Double dot_product =  ((b.getX() - a.getX())*(b.getX() - c.getX()) + (b.getY() - a.getY())*(b.getY() - c.getY()) + (b.getZ() - a.getZ())*(b.getZ() - c.getZ()));
        // Double point_1_2_mag =  (Math.sqrt(Math.pow((b.getX() - a.getX()),2) + Math.pow((b.getY() - a.getY()),2)));
        // Double point_2_3_mag =  (Math.sqrt(Math.pow((b.getX() - c.getX()),2) + Math.pow((b.getY() - c.getY()),2)));

        // Calculate the dot product and the magnitudes of the vectors
        Double dot_product =  ((b.getX() - a.getX())*(b.getX() - c.getX()) + (b.getY() - a.getY())*(b.getY() - c.getY()) + (b.getZ() - a.getZ())*(b.getZ() - c.getZ()));
        Double point_1_2_mag =  (Math.sqrt(Math.pow((b.getX() - a.getX()),2) + Math.pow((b.getY() - a.getY()),2)+ Math.pow((b.getZ() - a.getZ()),2)));
        Double point_2_3_mag =  (Math.sqrt(Math.pow((b.getX() - c.getX()),2) + Math.pow((b.getY() - c.getY()),2)+ Math.pow((b.getZ() - c.getZ()),2)));

        // Calculate the angle between the left hand, elbow, and shoulder landmarks in degrees
        Double aangle = (Math.acos(dot_product / (point_1_2_mag * point_2_3_mag))* (180 / Math.PI));
        // System.out.println(Double.toString(aangle));

        return aangle;

    }
    public JointsDto calculateAll(List<LandmarkDto> landmarkArrays){

        landmarkArray = landmarkArrays;

        //왼 팔꿈치 11 13 15
        Double lelbow = calculateEach(11, 13, 15);

        //오른팔꿈치 12 14 16
        Double relbow = calculateEach(12, 14, 16);

        //왼어깨 12 11 13
        Double lshoulder = calculateEach(13, 11, 23);

        //오른어깨 11 12 14
        Double rshoulder = calculateEach(14, 12, 24);


        //왼무릎 23 25 27
        Double lknee = calculateEach(23, 25, 27);


        //오른무릎 24 26 28
        Double rknee = calculateEach(24, 26, 28);


        // //왼골반 24 23 25
        // Double lhip = calculateEach(24, 23, 25);


        // //오른골반 23 24 26
        // Double rhip = calculateEach(23, 24, 26);


        JointsDto joints = new JointsDto("", lelbow, relbow, lshoulder, rshoulder, lknee, rknee);

        return joints;
    }

    private List<String> tooStraight = new ArrayList<>();
    private List<String> tooCurved = new ArrayList<>();


    public Double compareEach(String name, Double pose, Double joint){
        Double error = (pose-joint)/pose*100;
        System.out.println("Compare with correct val");
        System.out.println(name+joint);
        System.out.println(error);
        // Double minval = pose*0.95;
        // Double maxval = pose*1.05;
        if (error < -30){
            tooStraight.add(name);
        }
        else if(error>30){
            tooCurved.add(name);
        }
        return Math.abs(error);
    }

    public Object[] comparePose(Pose pose, JointsDto joints){

        tooCurved.clear();
        tooStraight.clear();

        Double error = 0.0;

        error+=compareEach("right elbow", pose.getLelbow(), joints.getLelbow());
        error+=compareEach("left elbow", pose.getRelbow(), joints.getRelbow());
        error+=compareEach("right shoulder", pose.getLshoulder(), joints.getLshoulder());
        error+=compareEach("left shoulder", pose.getRshoulder(), joints.getRshoulder());
        error+=compareEach("right knee", pose.getLknee(), joints.getLknee());
        error+=compareEach("left knee", pose.getRknee(), joints.getRknee());
        error = 100 - (error/6);

        // boolean curved = tooCurved.isEmpty();
        // boolean straight = tooStraight.isEmpty();
        String feedback = "";
        if(tooCurved.isEmpty()==false){
            feedback="Straighten ";
            for(String name : tooCurved){
                feedback=feedback+name+", ";
            }
            feedback+=". ";
        }
        if(tooStraight.isEmpty()==false){
            feedback+="Curl ";
            for(String name : tooStraight){
                feedback=feedback+name+", ";
            }
            feedback+=". ";
        }
        if(feedback==""){
            feedback="Good job.";
        }
        Object[] returnVal = new Object[] {feedback, String.format("%.2f", error)};
        System.out.println(returnVal.toString());
        return returnVal;
    }

    private Boolean stop;

    public void compareAngle(String name, Double joint, Double newjoint){
        Double diff = Math.abs(joint-newjoint)/joint*100;
        System.out.println("Compare with previous");
        System.out.println(name);
        System.out.println(diff);

        if (diff>20){
            stop=false;
        }
        return ;
    }

    public boolean compareAngles(JointsDto currentJoints, JointsDto newJoints) {
        stop=true;

        compareAngle("right elbow", currentJoints.getLelbow(), newJoints.getLelbow());
        compareAngle("left elbow", currentJoints.getRelbow(), newJoints.getRelbow());
        compareAngle("right shoulder", currentJoints.getLshoulder(), newJoints.getLshoulder());
        compareAngle("left shoulder", currentJoints.getRshoulder(), newJoints.getRshoulder());
        compareAngle("right knee", currentJoints.getLknee(), newJoints.getLknee());
        compareAngle("left knee", currentJoints.getRknee(), newJoints.getRknee());

        return stop;
    }
    
}
