package com.example.demo.dto.pose;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data

public class Pose {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // private Joints joint;
    // @JsonProperty("name")
    private String name;
    // @JsonProperty("lelbow")

    private Double lelbow;
    private Double relbow;
    private Double lshoulder;
    private Double rshoulder;
    private Double lknee;
    private Double rknee;
    private Double neck;


}
