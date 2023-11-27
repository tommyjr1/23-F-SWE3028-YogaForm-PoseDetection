package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Login {

    private String credential;
    private String token;

    @Override
    public String toString() {
        return "Credential: " + credential + 
            "Token" + 
                token;
    }

}