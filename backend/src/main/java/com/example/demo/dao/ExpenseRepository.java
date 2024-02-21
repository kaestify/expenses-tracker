package com.example.demo.dao;

import com.example.demo.entity.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUserEmail(String userEmail);

    Expense findByUserEmailAndId(String userEmail, Long id);

//    http://localhost:8080/api/expenses/search/findByCategory?category=Entertainment
//    @Query(value= "SELECT * from Expense where category = ?", nativeQuery = true)
//    List<Expense> findByCategory(@RequestParam("categoryName") String category);

    @Query(value= "SELECT o.category, SUM(o.amount) from Expense o WHERE o.user_email = ? GROUP BY category", nativeQuery = true)
    List<Object[]> getExpensesBreakdownByCategory(String userEmail);

//    @Query(value= "SELECT CONCAT(YEAR(o.date),'-', MONTH(o.date)) AS month, SUM(amount) from Expense o GROUP BY CONCAT(YEAR(o.date),'-', MONTH(o.date)) UNION SELECT \"Total\", SUM(amount) \n" +
//            "FROM Expense o", nativeQuery = true)
//    List<Object[]> getExpensesBreakdownByYearMonth();

    @Query(value= "SELECT b.month, a.goal, b.spent FROM (\n" +
            "   select CONCAT(YEAR(date),'-', MONTH(date)) AS month, SUM(amount) AS spent from expense WHERE user_email = :userEmail group by CONCAT(YEAR(date),'-', MONTH(date))\n" +
            "   ) as b\n" +
            "\n" +
            "   LEFT JOIN (\n" +
            "     select CONCAT(YEAR(date),'-', MONTH(date)) AS month, SUM(amount) AS goal from goal WHERE user_email = :userEmail group by CONCAT(YEAR(date),'-', MONTH(date))\n" +
            "   ) as a ON a.month = b.month", nativeQuery = true)
    List<Object[]> getExpensesBreakdownByYearMonth(String userEmail);


    @Query(value= "SELECT CONCAT(YEAR(o.date),'-', MONTH(o.date)) AS month, category, SUM(amount) from Expense o WHERE user_email = ? GROUP BY CONCAT(YEAR(o.date),'-', MONTH(o.date)), category", nativeQuery = true)
    List<Object[]> getExpensesBreakdownByYearMonthCategory(String userEmail);

}
