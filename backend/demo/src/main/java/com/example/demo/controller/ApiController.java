package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.datatype.Angle;
import com.example.demo.datatype.Landmark;
import com.example.demo.datatype.Login;
import com.example.demo.tts.Tts;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.protobuf.ByteString;


@RestController
public class ApiController {
    // @Autowired
    // private AngleService angleService;

    // public ApiController(AngleService angleService) {
    //     this.angleService = angleService;
    // }

    private String checkVal = "none";
    private Angle preangle = new Angle();
    // private Landmark[] landmark1 = new Landmark();
    private List<Landmark> landmark1 = new ArrayList<>();
    private static final ObjectMapper mapper = new ObjectMapper();
    // private Tts tts = new Tts();
    



    @GetMapping("/api/check")
    public String getCheck(){
        return checkVal;
    }
    @ResponseBody
    @PostMapping("/api/angle")
    public void postData(@RequestBody Angle angle){

        // System.out.println(angle);
        String values = angle.getValue();

        landmark1 = null;
        try {
            landmark1 = mapper.readValue(values, new TypeReference<List<Landmark>>() {});
        } catch (JsonProcessingException e) {};
        System.out.println(landmark1.size());


        Landmark a = landmark1.get(11);          
        Landmark b = landmark1.get(13);
        Landmark c = landmark1.get(15);

        // Calculate the dot product and the magnitudes of the vectors
        Double dot_product =  ((b.getX() - a.getX())*(b.getX() - c.getX()) + (b.getY() - a.getY())*(b.getY() - c.getY()));
        Double point_1_2_mag =  (Math.sqrt(Math.pow((b.getX() - a.getX()),2) + Math.pow((b.getY() - a.getY()),2)));
        Double point_2_3_mag =  (Math.sqrt(Math.pow((b.getX() - c.getX()),2) + Math.pow((b.getY() - c.getY()),2)));

        // Calculate the angle between the left hand, elbow, and shoulder landmarks in degrees
        Double aangle = (Math.acos(dot_product / (point_1_2_mag * point_2_3_mag))* (180 / Math.PI));
        System.out.println(Double.toString(aangle));


        // preangle.setValue(arrayS);
        // System.out.println(arrayL.toString());
        // 팔이면 팔 다리면 다리 확인해야함
        // preangle = angle;
        // preangle.setValue(angle.getValue());
        // System.out.println(arrayL.get(0));
        // landmark1.setX(preangle.getValue().get(0).getX());
        // landmark1.setY(preangle.getValue().get(0).getY());
        // landmark1.setZ(preangle.getValue().get(0).getZ());
        // landmark1.setVisibility(preangle.getValue().get(0).getVisibility());
        // System.out.println(landmark1);


        //이걸 동시에 전부 확인해야하는 캬..
        checkVal = "none";

        // if(angle.getValue()!=null){
        //     Double val = Double.valueOf(landmark1.getX());
        //     System.out.println(val);
        //     //angle 위치에 따라 자세에 따라 correct 포즈 다를것임;;
        //     Double correctValue = 180.0;
        //     Double minval = correctValue*0.95;
        //     Double maxval = correctValue*1.05;
        //     String returnVal="correct pose";
        //     returnVal = (maxval < val) ? "Too straight" : "Correct Pose";
        //     returnVal = (minval > val) ? "Too curved" : "Correct Pose";

        //     checkVal = returnVal;
        //     // checkVal = angleService.checkAngle(preangle);
        //     // preangle.setCheck(checkVal);
        // }

        
    }

    @PostMapping("/api/login")
    public void postLogin(@RequestBody Login login){
        System.out.println(login);
    }

    // @GetMapping("/api/feedback")
    // public byte[] getFeedback() throws Exception{
    //     ByteString audiofile = Tts.main();
    //     byte[] audio = audiofile.toByteArray();
    //     return audio;
        
    // }

    @GetMapping("/api/feedback")
    public ByteString getFeedback() throws Exception{
        ByteString audiofile = Tts.main();
        // byte[] audio = audiofile.toByteArray();
        return audiofile;
        
    }

    

}