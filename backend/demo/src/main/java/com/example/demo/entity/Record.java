package com.example.demo.entity;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Data

public class Record {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userEmail;
    private String routineName;
    private Timestamp date;
    private String eachPose;
    private String eachScore;
    private Integer score;

    public Record(String email, String routineName, Timestamp date, String eachPose, String eachScore, Integer score){
        this.userEmail = email;
        this.routineName = routineName;
        this.date = date;
        this.eachPose = eachPose;
        this.eachScore = eachScore;
        this.score = score;
    }
}
