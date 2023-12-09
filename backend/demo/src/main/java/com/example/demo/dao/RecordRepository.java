package com.example.demo.dao;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Record;



public interface RecordRepository extends JpaRepository<Record, Long> {
    // boolean existsByLoginId(String loginId);
    // boolean existsByNickname(String nickname);
    // Optional<User> findByLoginId(String loginId);
    List<Record> findByUserEmail(String userEmail);

    List<Record> findByUserEmail(String userEmail, Sort by);

    // @Query("select * from record where user_email== :userEmail order by routin_name")
    // List<Record> findByUserEmail(Sortby);

    
}
