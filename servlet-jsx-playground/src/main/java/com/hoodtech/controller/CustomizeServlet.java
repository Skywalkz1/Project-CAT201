package com.hoodtech.controller;

import com.google.gson.Gson;
import com.hoodtech.model.Category;
import com.hoodtech.model.Product;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/api/customize")
public class CustomizeServlet extends HttpServlet {

    
    private static final String URL = "jdbc:oracle:thin:@//localhost:1521/xe"; 
    private static final String USER = "system"; 
    private static final String PASS = "1234"; 

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); 
        resp.setHeader("Access-Control-Allow-Methods", "GET");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        List<Category> categoryList = new ArrayList<>();

        try {
            
            Class.forName("oracle.jdbc.driver.OracleDriver");
            try (Connection conn = DriverManager.getConnection(URL, USER, PASS)) {

                
                String catSql = "SELECT * FROM categories ORDER BY sort_order";
                PreparedStatement catStmt = conn.prepareStatement(catSql);
                ResultSet catRs = catStmt.executeQuery();

                while (catRs.next()) {
                    String catId = catRs.getString("cat_id");
                    String catName = catRs.getString("cat_name");

                    Category category = new Category(catId, catName);


                    String prodSql = "SELECT * FROM products WHERE cat_id = ?";
                    PreparedStatement prodStmt = conn.prepareStatement(prodSql);
                    prodStmt.setString(1, catId);
                    ResultSet prodRs = prodStmt.executeQuery();

                    while (prodRs.next()) {
                        Product p = new Product(
                                prodRs.getString("prod_id"),
                                prodRs.getString("prod_name"),
                                prodRs.getDouble("price")
                        );
                        category.addProduct(p);
                    }
                    prodRs.close();
                    prodStmt.close();

                    categoryList.add(category);
                }
            }

            
            Gson gson = new Gson();
            String json = gson.toJson(categoryList);

            
            PrintWriter out = resp.getWriter();
            out.print(json);
            out.flush();

        } catch (Exception e) {
            e.printStackTrace();
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}