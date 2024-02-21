package com.example.demo.dao;

import com.example.demo.entity.Expense;
import com.example.demo.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


public interface GoalRepository extends JpaRepository<Goal, Long> {

   List<Goal> findByUserEmail(String userEmail);

   Goal findByUserEmailAndId(String userEmail, Long id);

   @Query(value= "SELECT * FROM Goal o WHERE date= :date AND user_email= :userEmail", nativeQuery = true)
   List<Goal> findByUserEmailAndDate(String date, String userEmail);


}
