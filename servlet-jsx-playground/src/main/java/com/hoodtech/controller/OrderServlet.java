package com.hoodtech.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.hoodtech.model.Order;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@WebServlet("/api/orders/*")
public class OrderServlet extends HttpServlet {

    private static final String DB_URL = "jdbc:oracle:thin:@localhost:1521:xe";
    private static final String DB_USER = "system";
    private static final String DB_PASS = "1234"; 

    private Gson gson = new Gson();

    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setupCors(resp);

        try {
            
            BufferedReader reader = req.getReader();
            JsonObject json = JsonParser.parseReader(reader).getAsJsonObject();

            int userId = json.get("userId").getAsInt();
            double total = json.get("total").getAsDouble();
            int itemCount = json.get("itemCount").getAsInt();

            
            String orderId = "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

            try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
                String sql = "INSERT INTO orders (order_id, user_id, total_amount, status, item_count, order_date) VALUES (?, ?, ?, 'Paid', ?, CURRENT_TIMESTAMP)";
                try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                    pstmt.setString(1, orderId);
                    pstmt.setInt(2, userId);
                    pstmt.setDouble(3, total);
                    pstmt.setInt(4, itemCount);
                    pstmt.executeUpdate();
                }
            }

            resp.getWriter().write("{\"message\": \"Order success\", \"orderId\": \"" + orderId + "\"}");

        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(500);
            resp.getWriter().write("{\"error\": \"Order failed\"}");
        }
    }

    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setupCors(resp);
        String userIdParam = req.getParameter("userId");
        List<Order> list = new ArrayList<>();

        String sql;
        if (userIdParam != null) {
            
            sql = "SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC";
        } else {
            
            sql = "SELECT * FROM orders ORDER BY order_date DESC";
        }

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            if (userIdParam != null) {
                pstmt.setInt(1, Integer.parseInt(userIdParam));
            }

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    
                    Timestamp ts = rs.getTimestamp("order_date");
                    String dateStr = ts.toLocalDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

                    list.add(new Order(
                            rs.getString("order_id"),
                            rs.getInt("user_id"),
                            rs.getDouble("total_amount"),
                            dateStr,
                            rs.getString("status"),
                            rs.getInt("item_count")
                    ));
                }
            }

            resp.getWriter().print(gson.toJson(list));

        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(500);
        }
    }

    
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setupCors(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    private void setupCors(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setHeader("Content-Type", "application/json");
        resp.setCharacterEncoding("UTF-8");
    }
}