package com.example.demo.entity;

import javax.persistence.Column;
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

public class Routine {
    // private String credential;
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userEmail;
    @Column(nullable = false, unique = true)
    private String routineName;
    private String poses;

    public Routine(String userEmail, String routineName, String poses){
        this.userEmail = userEmail;
        this.routineName = routineName;
        this.poses = poses;
    }

}
