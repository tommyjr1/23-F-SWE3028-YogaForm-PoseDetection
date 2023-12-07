package com.example.demo.controller;

import java.io.IOException;
import java.security.GeneralSecurityException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LoginDto;
import com.example.demo.dto.RecordDto;
import com.example.demo.dto.ResponseDto;
import com.example.demo.entity.Record;
import com.example.demo.entity.User;
import com.example.demo.entity.UserRole;
import com.example.demo.service.JwtTokenProvider;
import com.example.demo.service.UserService;


@RestController
@RequestMapping("/yf/user")

public class UserController {

    private String userEmail;

    @Autowired
    UserService userService;
    @Autowired
    JwtTokenProvider jwtTokenProvider;
    // @Autowired
    // RedisService redisService;
    
    /*
     * 로그인을 요청하면 동시에 JWT 토큰을 만들어서 반환해줘야 하기 때문에, 세션과 다르게 직접 로그인 만들어야함

    전달받은 크레덴셜을 가지고 실제 DB에 존재하는 유저인지 확인 후, User 객체로 반환을 해줍니다.

    그리고 User의 이메일과 권한을 추출해 토큰을 만들어주는 작업을 해줍니다.
     */
    @PostMapping("/login")
    public ResponseDto postLogin(@RequestBody LoginDto loginDto, HttpServletResponse response) throws GeneralSecurityException, IOException{


        User user = userService.login(loginDto);
        String email = user.getEmail();
        UserRole role = user.getRole();
        System.out.println(email+role);
        String token = jwtTokenProvider.createToken(email, role);
        String refreshToken = jwtTokenProvider.createRefreshToken(email, role);

        //refreshToken을 Redis에 저장해주기
        // redisService.setRedisStringValue(email, refreshToken);

        response.setHeader("JWT", token);
        response.setHeader("REFRESH", refreshToken);
        ResponseDto res = new ResponseDto(token, refreshToken);

        return res;

    }

    @PostMapping("/reissue")
    @ResponseBody
    public String reissue(HttpServletResponse response, HttpServletRequest request, @RequestHeader("REFRESH") String refreshToken) {
        String newAccessToken = jwtTokenProvider.reissueAccessToken(refreshToken, request);

        response.setHeader("JWT", newAccessToken);
        return newAccessToken;
    }

    @PostMapping("/addRecord")
    @ResponseBody
    public void addRecord(@RequestBody RecordDto recordDto, HttpServletRequest request){
        Record record = userService.addRecord(recordDto, request);
        return ;
    }

    @PostMapping("/getRecord")
    @ResponseBody
    public void getRecord(HttpServletRequest request){
        userService.getRecord(request);
        return ;
    }




    // // 저장
    // private final UserRepository UserRepository;
    // User User = new User();


    // private Long id;
    // UserRepository.save();

    // // 조회 findById
    // Optional<User> optionalUser = UserRepository.findById(id);
    // User findUser = optionalUser.get();

    // // 조회 findAll
    // List<User> Users = UserRepository.findAll();

    // // 수정
    // User = UserRepository.findById(id).get();
    // User.setName(newName);
    // UserRepository.save(User);

    // // 삭제
    // UserRepository.delete(User);

}