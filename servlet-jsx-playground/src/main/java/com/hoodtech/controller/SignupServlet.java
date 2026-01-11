package com.hoodtech.controller;

import com.google.gson.Gson;
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
import java.sql.SQLIntegrityConstraintViolationException;

@WebServlet("/api/signup")
public class SignupServlet extends HttpServlet {

    // DB Credentials
    private static final String URL = "jdbc:oracle:thin:@//localhost:1521/xe";
    private static final String USER = "system";
    private static final String PASS = "1234";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 1. Setup CORS & JSON Headers
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        try {
            // 2. Read JSON Data from Frontend
            Gson gson = new Gson();
            BufferedReader reader = req.getReader();
            JsonObject data = gson.fromJson(reader, JsonObject.class);

            String fullName = data.get("fullName").getAsString();
            String email = data.get("email").getAsString();
            String password = data.get("password").getAsString();
            // Default role is 'customer'
            String role = "customer";

            // 3. Insert into Database
            Class.forName("oracle.jdbc.driver.OracleDriver");
            try (Connection conn = DriverManager.getConnection(URL, USER, PASS)) {

                String sql = "INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)";
                PreparedStatement stmt = conn.prepareStatement(sql);
                stmt.setString(1, fullName);
                stmt.setString(2, email);
                stmt.setString(3, password); // In a real app, hash this password!
                stmt.setString(4, role);

                stmt.executeUpdate();

                // Success Response
                resp.getWriter().write("{\"message\": \"User registered successfully\"}");
            }

        } catch (SQLIntegrityConstraintViolationException e) {
            // This error happens if the email is already in the database
            resp.setStatus(HttpServletResponse.SC_CONFLICT); // 409 Conflict
            resp.getWriter().write("{\"error\": \"Email already exists\"}");
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\": \"Server error: " + e.getMessage() + "\"}");
        }
    }

    // Handle Pre-flight requests
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setStatus(HttpServletResponse.SC_OK);
    }
}