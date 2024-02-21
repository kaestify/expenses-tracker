package com.example.demo.controller;

import com.example.demo.entity.Expense;
import com.example.demo.requestmodels.AddExpenseRequest;
import com.example.demo.requestmodels.UpdateExpenseRequest;
import com.example.demo.requestmodels.UpdateGoalRequest;
import com.example.demo.service.ExpenseService;
import com.example.demo.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    private ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping("/all")
    public List getAllExpenses(@RequestHeader(value = "Authorization") String token) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtract(token, "\"sub\"");
        if (userEmail == null) {
            throw new Exception("User email is missing");
        }
       return expenseService.getAllExpenses(userEmail);
    }

    @PostMapping("/add")
    public void addExpense(@RequestHeader(value="Authorization") String token,
                           @RequestBody AddExpenseRequest addExpenseRequest) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtract(token, "\"sub\"");
        if (userEmail==null) {
            throw new Exception("User email is missing");
        }
        expenseService.addExpense(userEmail, addExpenseRequest);
    }
    @PutMapping("/update")
    public void updateExpense(@RequestHeader(value = "Authorization") String token,
                           @RequestBody UpdateExpenseRequest updateExpenseRequest) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtract(token, "\"sub\"");
        if (userEmail == null) {
            throw new Exception("User email is missing");
        }
        expenseService.updateExpense(userEmail, updateExpenseRequest);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteExpense(@RequestHeader(value="Authorization") String token,
                              @PathVariable(value="id") Long id) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtract(token, "\"sub\"");
        if (userEmail==null) {
            throw new Exception("User email is missing");
        }
        expenseService.deleteExpense(userEmail, id);
    }

    @GetMapping("/get/{id}") //get single expense
    public Expense getExpense(@RequestHeader(value = "Authorization") String token,
                        @PathVariable(value="id") Long id) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtract(token, "\"sub\"");
        if (userEmail == null) {
            throw new Exception("User email is missing");
        }
        return expenseService.getExpense(userEmail,id);
    }

    @GetMapping("/getbreakdown/bycategory")
    public List getBreakdownByCategory(@RequestHeader(value="Authorization") String token) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtract(token, "\"sub\"");
        if (userEmail==null) {
            throw new Exception("User email is missing");
        }
        return expenseService.getBreakdownByCategory(userEmail);
    }

    @GetMapping("/getbreakdown/bymonth")
    public List getBreakdownByMonth(@RequestHeader(value="Authorization") String token) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtract(token, "\"sub\"");
        if (userEmail==null) {
            throw new Exception("User email is missing");
        }
        return expenseService.getBreakdownByMonth(userEmail);
    }

    @GetMapping("/getbreakdown/bymonthandcategory")
    public List getExpensesBreakdownByYearMonthCategory(@RequestHeader(value="Authorization") String token) throws Exception {

        String userEmail = ExtractJWT.payloadJWTExtract(token, "\"sub\"");
        if (userEmail==null) {
            throw new Exception("User email is missing");
        }
        return expenseService.getBreakdownByMonthCategory(userEmail);
    }


}
