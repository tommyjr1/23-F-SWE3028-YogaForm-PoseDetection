package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AngleDto {
    private String value;

    @Override
    public String toString() {
        return "Landmarks: " +
                value;
    }

    
}
