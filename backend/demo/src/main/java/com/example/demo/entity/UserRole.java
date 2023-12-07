package com.example.demo.entity;

import lombok.Getter;

@Getter
public enum UserRole {
    //spring security가 제공하는 ROLE 네이밍 정책이 <ROLE_권한>이므로 맞춰서 작성해준다.
    ROLE_ADMIN("관리자"), ROLE_MEMBER("일반사용자");

    private String description;

    UserRole(String description) {
        this.description = description;
    }
}
