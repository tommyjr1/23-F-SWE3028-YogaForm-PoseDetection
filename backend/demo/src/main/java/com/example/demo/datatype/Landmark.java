package com.example.demo.datatype;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class Landmark {
    @JsonProperty("x")
    private @Getter @Setter Double x;

    @JsonProperty("y")
    private @Getter @Setter Double y;
    @JsonProperty("z")
    private @Getter @Setter Double z;
    @JsonProperty("visibility")
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
