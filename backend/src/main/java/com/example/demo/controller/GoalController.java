package com.example.demo.controller;

import com.example.demo.entity.Goal;
import com.example.demo.requestmodels.AddGoalRequest;
import com.example.demo.requestmodels.UpdateGoalRequest;
import com.example.demo.service.ExpenseService;
import com.example.demo.service.GoalService;
import com.example.demo.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/goals")
public class GoalController {
    private GoalService goalService;

    @Autowired
    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @PostMapping("/add")
    public void addGoal(@RequestHeader(value = "Authorization") String token,
                        @RequestBody AddGoalRequest addGoalRequest) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtract(token, "\"sub\"");
        if (userEmail == null) {
            throw new Exception("User email is missing");
        }
         goalService.addGoal(userEmail,addGoalRequest);
    }

    @GetMapping("/get/{id}") //get single goal
    public Goal getGoal(@RequestHeader(value = "Authorization") String token,
                        @PathVariable(value="id") Long id) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtract(token, "\"sub\"");
        if (userEmail == null) {
            throw new Exception("User email is missing");
        }
       return goalService.getGoal(userEmail,id);
    }

    @PutMapping("/update")
    public void updateGoal(@RequestHeader(value = "Authorization") String token,
                        @RequestBody UpdateGoalRequest updateGoalRequest) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtract(token, "\"sub\"");
        if (userEmail == null) {
            throw new Exception("User email is missing");
        }
        goalService.updateGoal(userEmail, updateGoalRequest);
    }

    @GetMapping("/all")
    public List getAllGoals(@RequestHeader(value = "Authorization") String token) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtract(token, "\"sub\"");
        if (userEmail == null) {
            throw new Exception("User email is missing");
        }
        return goalService.getAllGoals(userEmail);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGoal(@RequestHeader(value = "Authorization") String token,
                           @PathVariable(value="id") Long id) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtract(token, "\"sub\"");
        if (userEmail == null) {
            throw new Exception("User email is missing");
        }

         goalService.deleteGoal(userEmail, id);
    }

}
