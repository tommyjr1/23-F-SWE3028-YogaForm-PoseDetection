package com.example.demo.datatype;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

public class Angle {
    private  @Getter @Setter ArrayList<Landmark> value;
    // private String part;
    // private String check;

    public Angle() {

    }

    public Angle(final ArrayList<Landmark> value) {
        this.value = value;
    }

    
    @Override
    public String toString() {
        return "Landmarks: " +
                value.toString();
    }
}
