package com.example.demo.controller;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.Login;
import com.example.demo.dto.Routine;
import com.example.demo.service.RoutineService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;


@RestController
public class UserController {

    @Autowired
    RoutineService routineService;
    
    private String userId="";

    private HttpTransport transport;
    private JsonFactory jsonFactory;
    private static final ObjectMapper mapper = new ObjectMapper();
    
    @PostMapping("/yf/user/login")
    public void postLogin(@RequestBody Login login) throws GeneralSecurityException, IOException{
        String CLIENT_ID="1022110957362-ncqd7ish7v0gabqmqah3a8dieikmeu6k.apps.googleusercontent.com";
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
            // Specify the CLIENT_ID of the app that accesses the backend
            .setAudience(Collections.singletonList(CLIENT_ID))
            // Or, if multiple clients access the backend:
            //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
            .build();


        GoogleIdToken idToken = verifier.verify(login.getCredential());
        if (idToken != null) {
          Payload payload = idToken.getPayload();

          // Print user identifier
          userId = payload.getSubject();

        //   // Get profile information from payload
        //   String email = payload.getEmail();
        //   boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
        //   String name = (String) payload.get("name");
        //   String pictureUrl = (String) payload.get("picture");
        //   String locale = (String) payload.get("locale");
        //   String familyName = (String) payload.get("family_name");
        //   String givenName = (String) payload.get("given_name");

        //   // Use or store profile information
        //   // ...

        System.out.println(userId);
        } 
        else {
          System.out.println("Invalid ID token.");
        }
    }

    @GetMapping("/yf/user/routine/{name}")
    public String getRoutine(@PathVariable("name") String name){
        System.out.println(name);        
        Routine routine = routineService.getByRoutineName(name);
        return routine.getPoses();
    }

    @GetMapping("/yf/user/routine/")
    public List<String> getRoutine(){
        List<String> routines = routineService.getUserRoutines(userId);
        return routines;

    }


    @ResponseBody
    @PostMapping("/yf/user/addRoutines")
    public void postAddRoutines(@RequestBody String routines){
        
        List<Routine> routine1 = new ArrayList<>();
        try {
            routine1 = mapper.readValue(routines, new TypeReference<List<Routine>>() {});
        } catch (JsonProcessingException e) {};
        System.out.println(routine1.size());

        routineService.saveAll(routine1);
        return;
    }

    @ResponseBody
    @PostMapping("/yf/user/addRoutine")
    public void postAddRoutines(@RequestBody Routine routine){
        System.out.println(routine);
        routineService.saveRoutine(routine, userId);
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