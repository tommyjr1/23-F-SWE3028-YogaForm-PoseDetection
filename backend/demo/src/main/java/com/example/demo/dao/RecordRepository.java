package com.example.demo.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Record;



public interface RecordRepository extends JpaRepository<Record, Long> {
    // boolean existsByLoginId(String loginId);
    // boolean existsByNickname(String nickname);
    // Optional<User> findByLoginId(String loginId);
    List<Record> findByUserEmail(String userEmail);

    // Member findByName(String name);
    // List<Member> findByAgeGreaterThanEqualAndAgeLessThanEqual(int minAge, int maxAge);
    // List<Member> findAllByIsMale(Boolean isMale);
    
}
