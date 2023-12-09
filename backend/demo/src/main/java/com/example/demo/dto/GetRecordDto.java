package com.example.demo.dto;

import com.google.auto.value.AutoValue.Builder;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Getter
@Data
@Builder
@AllArgsConstructor
public class GetRecordDto {

    private String routineName;
    private String scores;
    private String dates;

}