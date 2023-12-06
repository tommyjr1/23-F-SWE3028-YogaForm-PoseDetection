package com.example.demo.dto;

import lombok.Getter;

@Getter
public class LoginDto {

    private String credential;
    private String token;

    @Override
    public String toString() {
        return "Credential: " + credential + 
            "Token" + 
                token;
    }

}