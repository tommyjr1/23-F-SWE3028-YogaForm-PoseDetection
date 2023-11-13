package com.example.demo.datatype;

import lombok.Getter;
import lombok.Setter;

public class Angle {
    private  @Getter @Setter String value;
    // private String part;
    // private String check;

    public Angle() {

    }

    public Angle(final String value) {
        this.value = value;
    }

    
    @Override
    public String toString() {
        return "Landmarks: " +
                value;
    }
}
