package com.example.demo.requestmodels;

import lombok.Data;

@Data
public class UpdateExpenseRequest {
    private String item;
    private double amount;
    private String date;

    private String category;
    private Long id;
}
