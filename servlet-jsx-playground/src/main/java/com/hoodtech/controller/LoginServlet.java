package com.hoodtech.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.hoodtech.model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

@WebServlet("/api/login")
public class LoginServlet extends HttpServlet {

    // DB Credentials (Same as before)
    private static final String URL = "jdbc:oracle:thin:@//localhost:1521/xe";
    private static final String USER = "system";
    private static final String PASS = "1234";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        // 1. Setup CORS & Headers
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "POST");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        PrintWriter out = resp.getWriter();
        Gson gson = new Gson();

        try {
            // 2. Read JSON Body from React
            BufferedReader reader = req.getReader();
            JsonObject incomingData = gson.fromJson(reader, JsonObject.class);

            String email = incomingData.get("email").getAsString();
            String password = incomingData.get("password").getAsString();

            // 3. Check Database
            Class.forName("oracle.jdbc.driver.OracleDriver");
            try (Connection conn = DriverManager.getConnection(URL, USER, PASS)) {

                String sql = "SELECT user_id, full_name, role FROM users WHERE email = ? AND password = ?";
                PreparedStatement stmt = conn.prepareStatement(sql);
                stmt.setString(1, email);
                stmt.setString(2, password);

                ResultSet rs = stmt.executeQuery();

                if (rs.next()) {
                    // --- SUCCESS: User found ---
                    User user = new User(
                            rs.getInt("user_id"),
                            rs.getString("full_name"),
                            email,
                            rs.getString("role") // <--- FETCH ROLE FROM DB
                    );

                    // Return User object + Success message
                    String jsonResponse = gson.toJson(user);
                    out.print(jsonResponse);

                } else {
                    // --- FAILURE: Invalid credentials ---
                    resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Error
                    out.print("{\"error\": \"Invalid email or password\"}");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\": \"Server error: " + e.getMessage() + "\"}");
        }
        out.flush();
    }

    // Handle "Pre-flight" requests from browser (CORS requirement)
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setStatus(HttpServletResponse.SC_OK);
    }
}