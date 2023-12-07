package com.example.demo.service;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RedisService {

    // private final StringRedisTemplate stringRedisTemplate;

    // public void setRedisStringValue(String email, String refreshToken) {
    //     ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
    //     stringValueOperations.set(email, refreshToken, Duration.ofMinutes(2));
    // }

    // public String getRedisStringValue(String key) {
    //     ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();

    //     return stringValueOperations.get(key);
    // }
}