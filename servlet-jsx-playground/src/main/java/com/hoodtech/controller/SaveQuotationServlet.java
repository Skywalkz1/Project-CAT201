package com.hoodtech.controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@WebServlet("/api/quotation/save")
public class SaveQuotationServlet extends HttpServlet {

    private static final String URL = "jdbc:oracle:thin:@//localhost:1521/xe";
    private static final String USER = "system";
    private static final String PASS = "1234";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Setup Headers
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setContentType("application/json");

        Connection conn = null;

        try {
            // 1. Read JSON
            Gson gson = new Gson();
            BufferedReader reader = req.getReader();
            JsonObject data = gson.fromJson(reader, JsonObject.class);

            String quoteId = data.get("quoteId").getAsString();
            int userId = data.get("userId").getAsInt();
            double grandTotal = data.get("grandTotal").getAsDouble();
            JsonArray items = data.getAsJsonArray("items");

            // 2. Database Transaction
            Class.forName("oracle.jdbc.driver.OracleDriver");
            conn = DriverManager.getConnection(URL, USER, PASS);
            conn.setAutoCommit(false); // Start Transaction

            // A. Insert Header
            String sqlHeader = "INSERT INTO quotations (quote_id, user_id, total_amount) VALUES (?, ?, ?)";
            try (PreparedStatement stmt = conn.prepareStatement(sqlHeader)) {
                stmt.setString(1, quoteId);
                stmt.setInt(2, userId);
                stmt.setDouble(3, grandTotal);
                stmt.executeUpdate();
            }

            // B. Insert Items
            String sqlItem = "INSERT INTO quotation_items (quote_id, prod_id, product_name, quantity, unit_price, line_total) VALUES (?, ?, ?, ?, ?, ?)";
            try (PreparedStatement stmt = conn.prepareStatement(sqlItem)) {
                for (JsonElement itemElem : items) {
                    JsonObject item = itemElem.getAsJsonObject();
                    stmt.setString(1, quoteId);
                    stmt.setString(2, item.get("id").getAsString());
                    stmt.setString(3, item.get("name").getAsString());
                    stmt.setInt(4, item.get("quantity").getAsInt());
                    stmt.setDouble(5, item.get("price").getAsDouble());
                    stmt.setDouble(6, item.get("total").getAsDouble());
                    stmt.addBatch(); // Group inserts for performance
                }
                stmt.executeBatch();
            }

            conn.commit(); // Save changes
            resp.getWriter().write("{\"message\": \"Quotation saved successfully\"}");

        } catch (Exception e) {
            e.printStackTrace();
            if (conn != null) {
                try { conn.rollback(); } catch (SQLException ex) { ex.printStackTrace(); } // Undo if error
            }
            resp.setStatus(500);
            resp.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        } finally {
            if (conn != null) {
                try { conn.close(); } catch (SQLException e) { e.printStackTrace(); }
            }
        }
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setStatus(200);
    }
}