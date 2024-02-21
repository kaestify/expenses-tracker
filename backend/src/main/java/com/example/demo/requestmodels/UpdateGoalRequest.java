package com.example.demo.requestmodels;

import lombok.Data;

@Data
public class UpdateGoalRequest {
    private String date;

    private double amount;

    private Long id;
}
