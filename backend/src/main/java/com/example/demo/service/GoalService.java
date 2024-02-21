package com.example.demo.service;

import com.example.demo.dao.GoalRepository;
import com.example.demo.entity.Expense;
import com.example.demo.entity.Goal;
import com.example.demo.requestmodels.AddExpenseRequest;
import com.example.demo.requestmodels.AddGoalRequest;
import com.example.demo.requestmodels.UpdateGoalRequest;
import com.example.demo.utils.ExtractJWT;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional

public class GoalService {
    private GoalRepository goalRepository;

    public GoalService(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    public void addGoal(String userEmail,
                        AddGoalRequest addGoalRequest) throws Exception {

        List<Goal> validateGoal = goalRepository.findByUserEmailAndDate(addGoalRequest.getDate(), userEmail);
        if (validateGoal != null && !validateGoal.isEmpty()) {
            throw new Exception("Goal already created for that year and month. Update goal instead.");
        }
        Goal goal = new Goal();
        goal.setDate(addGoalRequest.getDate());
        goal.setAmount(addGoalRequest.getAmount());
        goal.setUserEmail(userEmail);
        goalRepository.save(goal);
    }

    public void updateGoal(String userEmail,
                        UpdateGoalRequest updateGoalRequest) throws Exception {

        Goal goalToEdit = goalRepository.findByUserEmailAndId( userEmail, updateGoalRequest.getId());
        if (goalToEdit== null) {
            throw new Exception("Goal not found for that user.");
        }

        goalToEdit.setDate(updateGoalRequest.getDate());
        goalToEdit.setAmount(updateGoalRequest.getAmount());
        goalToEdit.setUserEmail(userEmail);
        goalRepository.save(goalToEdit);
    }


    public List<Goal> getAllGoals(String userEmail) throws Exception {
        List<Goal> goals = goalRepository.findByUserEmail(userEmail);
        if(goals==null) {
            throw new Exception("Goals not found.");
        }
        return goals;
    }

    public Goal getGoal(String userEmail, Long id) throws Exception {
        Goal goal = goalRepository.findByUserEmailAndId(userEmail, id);
        if(goal == null) {
            throw new Exception("Goal not found.");
        }
        return goal;
    }

    public void deleteGoal(String userEmail, Long id) throws Exception {
       Goal validateDelete = goalRepository.findByUserEmailAndId(userEmail, id);
        if(validateDelete == null) {
            throw new Exception("Cannot delete goal that does not belong to you.");
        }
        goalRepository.deleteById(id);
    }

}
