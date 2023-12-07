package com.example.demo.dto;

import com.google.auto.value.AutoValue.Builder;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
@Builder
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