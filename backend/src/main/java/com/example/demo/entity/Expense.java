package com.example.demo.entity;
import lombok.Data;
import jakarta.persistence.*;


@Entity
@Data
@Table(name="expense")
public class Expense {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="category")
    private String category;

    @Column(name="user_email")
    private String userEmail;

    @Column(name="item")
    private String item;
    @Column(name="amount")
    private double amount;
    @Column(name="date")
    private String date;
}
