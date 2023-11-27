package com.example.demo.dto.pose;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Angle {
    private String value;

    @Override
    public String toString() {
        return "Landmarks: " +
                value;
    }

    
}
