package com.example.demo.dto;

import com.google.auto.value.AutoValue.Builder;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
@Builder
public class RecordDto {

    private String routineName;
    private String eachScore;
    private Integer score;

}