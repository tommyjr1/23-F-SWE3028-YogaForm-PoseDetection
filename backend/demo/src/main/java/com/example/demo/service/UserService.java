package com.example.demo.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dao.RecordRepository;
import com.example.demo.dao.RoutineRepository;
import com.example.demo.dao.UserRepository;
import com.example.demo.dto.GetRecordDto;
import com.example.demo.dto.LoginDto;
import com.example.demo.dto.RecordDto;
import com.example.demo.entity.Record;
import com.example.demo.entity.User;
import com.example.demo.entity.UserRole;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

@Service
@Transactional
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RecordRepository recordRepository;

    @Autowired
    RoutineRepository routineRepository;
    @Autowired
    JwtTokenProvider jwtTokenProvider;
    
    public static String client_id = "1022110957362-ncqd7ish7v0gabqmqah3a8dieikmeu6k.apps.googleusercontent.com";
    // private final BCryptPasswordEncoder encoder;


    private NetHttpTransport transport = new NetHttpTransport();
    private GsonFactory jsonFactory = new GsonFactory();
    

    //회원가입
    public User signup(Payload payload) throws GeneralSecurityException, IOException{
        System.out.println("Sign Up");
        String email = payload.getEmail();

        String nickname = (String) payload.get("name");

        // 사용자 ROLE 확인
        UserRole role = UserRole.ROLE_MEMBER;

        // boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());

    //   // Get profile information from payload
    //   String pictureUrl = (String) payload.get("picture");
    //   String locale = (String) payload.get("locale");
    //   String familyName = (String) payload.get("family_name");
    //   String givenName = (String) payload.get("given_name");
        User user = new User(email, nickname,"",role);
        User result = userRepository.save(user);
        return  result;
        // }
        // else{
        //     throw new CustomException(ErrorCode.NO_USER);
        // }

    }

    //로그인
    public User login(LoginDto loginDto) throws GeneralSecurityException, IOException {

        String credential = loginDto.getCredential().replaceAll("\"","");

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
            // Specify the CLIENT_ID of the app that accesses the backend
            .setAudience(Collections.singletonList(client_id))
            // Or, if multiple clients access the backend:
            //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
            .build();

        GoogleIdToken idToken = verifier.verify(credential);
        // if (idToken != null) {
        Payload payload = idToken.getPayload();

        String email = payload.getEmail();

        boolean exists = userRepository.existsByEmail(email);
        System.out.println("This user exists: "+exists);
        if(exists==false){
            signup(payload);
        }
        User user = userRepository.findByEmail(email);
        
        return user;
    }

    //기록 저장
    public Record addRecord(RecordDto recordDto, HttpServletRequest request){
        Timestamp date = Timestamp.valueOf(LocalDateTime.now());
        String token = request.getHeader("JWT");
        String userEmail = jwtTokenProvider.getUserEmail(token);
        String routine = routineRepository.findByRoutineName(recordDto.getRoutineName()).getPoses();
        Record record = new Record(userEmail, recordDto.getRoutineName(), date, routine, recordDto.getEachScore(), recordDto.getScore());
        
        Record ret = recordRepository.save(record);

        return ret;
    }

    public List<GetRecordDto> getRecord(HttpServletRequest request){
        String token = request.getHeader("JWT");
        String userEmail = jwtTokenProvider.getUserEmail(token);
        List<Record> records = recordRepository.findByUserEmail(userEmail, Sort.by(Sort.Direction.DESC, "routineName"));

        String prev = "";
        List<Integer> scores = new ArrayList<>();
        List<String> dates = new ArrayList<>();
        SimpleDateFormat TimestampToString = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        List<GetRecordDto> returns = new ArrayList<>();

        for (Record record: records){
            // System.out.println(record.getRoutineName());
            //저장
            if(prev==""){
                prev=record.getRoutineName();
            }
            // System.out.println(prev);
            if(record.getRoutineName().equals(prev)==false){
                GetRecordDto recordDto = new GetRecordDto(prev, scores, dates);
                returns.add(recordDto);
                scores.clear();
                dates.clear();;
                prev=record.getRoutineName();
            }
            scores.add(record.getScore());
            dates.add(TimestampToString.format(record.getDate()));
        }
    
        GetRecordDto recordDto = new GetRecordDto(prev, scores, dates);
        returns.add(recordDto);

        return returns;
        
    }

 
}