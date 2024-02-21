package com.example.demo.service;

import com.example.demo.dao.ExpenseRepository;
import com.example.demo.entity.Expense;
import com.example.demo.entity.Goal;
import com.example.demo.requestmodels.AddExpenseRequest;
import com.example.demo.requestmodels.UpdateExpenseRequest;
import com.example.demo.requestmodels.UpdateGoalRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@Transactional

public class ExpenseService {
    private ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<Object[]> getBreakdownByCategory(String userEmail) {
        return expenseRepository.getExpensesBreakdownByCategory(userEmail);
    }
    public List<Object[]> getBreakdownByMonth(String userEmail) {
        return expenseRepository.getExpensesBreakdownByYearMonth(userEmail);
    }

    public List<Object[]> getBreakdownByMonthCategory(String userEmail) {
        return expenseRepository.getExpensesBreakdownByYearMonthCategory(userEmail);
    }

    public List<Expense> getAllExpenses(String userEmail) throws Exception {
        return expenseRepository.findByUserEmail(userEmail);
    }

    public void addExpense(String userEmail, AddExpenseRequest addExpenseRequest) throws Exception {
       Expense expense = new Expense();
       expense.setAmount(addExpenseRequest.getAmount());
       expense.setDate(addExpenseRequest.getDate());
       expense.setItem(addExpenseRequest.getItem());
       expense.setCategory(addExpenseRequest.getCategory());
       expense.setUserEmail(userEmail);
       expenseRepository.save(expense);
    }

    public void updateExpense(String userEmail,
                           UpdateExpenseRequest updateExpenseRequest) throws Exception {

        Expense expenseToEdit = expenseRepository.findByUserEmailAndId( userEmail, updateExpenseRequest.getId());
        if (expenseToEdit== null) {
            throw new Exception("Expense not found for that user.");
        }

        expenseToEdit.setDate(updateExpenseRequest.getDate());
        expenseToEdit.setAmount(updateExpenseRequest.getAmount());
        expenseToEdit.setItem(updateExpenseRequest.getItem());
        expenseToEdit.setCategory(updateExpenseRequest.getCategory());
        expenseToEdit.setUserEmail(userEmail);
        expenseRepository.save(expenseToEdit);
    }


    public Expense getExpense(String userEmail, Long id) throws Exception {
        Expense expense = expenseRepository.findByUserEmailAndId(userEmail, id);
        if(expense == null) {
            throw new Exception("Expense not found.");
        }
        return expense;
    }

    public void deleteExpense(String userEmail, Long id) throws Exception {
        Expense validateDelete = expenseRepository.findByUserEmailAndId(userEmail, id);
        if(validateDelete == null) {
            throw new Exception("Cannot delete expense that does not belong to you.");
        }
        expenseRepository.deleteById(id);
    }

}
