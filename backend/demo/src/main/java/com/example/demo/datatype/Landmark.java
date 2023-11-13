package com.example.demo.datatype;

import lombok.Getter;
import lombok.Setter;

public class Landmark {
    private @Getter @Setter Double x;
    private @Getter @Setter Double y;
    private @Getter @Setter Double z;
    private @Getter @Setter Double visibility;


    public Landmark() {

    }

    public Landmark(final Double x, final Double y, final Double z, final Double visibility) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.visibility = visibility;

    }


    @Override
    public String toString() {
        return "Landmark"+
                Double.toString(x)+
                Double.toString(y)+
                Double.toString(z);

    }
}
