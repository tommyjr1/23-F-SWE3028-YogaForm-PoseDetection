package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ResponseDto;
import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrorCode;

@RestController
public class TokenExceptionController {

    @GetMapping("/exception/entrypoint")
    public void entryPoint() {
        throw new CustomException(ErrorCode.NO_LOGIN);
    }

    @GetMapping("/exception/tokenexpire")
    public ResponseDto tokenExpire() {
        // throw new CustomException(ErrorCode.TOKEN_EXPIRED);
        ResponseDto res = new ResponseDto(ErrorCode.TOKEN_EXPIRED.getDetail(), ErrorCode.TOKEN_EXPIRED.getDetail());

        return res;
    }

    @GetMapping("/exception/access")
    public void denied() {
        throw new CustomException(ErrorCode.NO_ADMIN);
    }
}