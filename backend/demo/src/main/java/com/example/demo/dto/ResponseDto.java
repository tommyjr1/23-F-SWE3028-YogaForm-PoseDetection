package com.example.demo.dto;

import com.google.auto.value.AutoValue.Builder;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Getter
@Data
@Builder
@AllArgsConstructor

public class ResponseDto {

    private String Token;
    private String RefreshToken;

    // @Override
    // public String toString(){
    //     return "Token"
    // }
    
}
