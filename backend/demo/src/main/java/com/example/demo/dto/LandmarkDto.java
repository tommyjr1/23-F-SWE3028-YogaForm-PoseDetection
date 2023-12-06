package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LandmarkDto {
    @JsonProperty("x")
    private @Getter @Setter Double x;

    @JsonProperty("y")
    private @Getter @Setter Double y;
    @JsonProperty("z")
    private @Getter @Setter Double z;
    @JsonProperty("visibility")
    private @Getter @Setter Double visibility;


    @Override
    public String toString() {
        return "Landmark"+
                Double.toString(x)+
                Double.toString(y)+
                Double.toString(z);

    }
}
