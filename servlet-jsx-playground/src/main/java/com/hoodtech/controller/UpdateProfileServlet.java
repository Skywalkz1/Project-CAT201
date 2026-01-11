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

@WebServlet("/api/profile/update")
public class UpdateProfileServlet extends HttpServlet {

    
    private static final String URL = "jdbc:oracle:thin:@//localhost:1521/xe";
    private static final String USER = "system";
    private static final String PASS = "1234";

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "PUT, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        try {
            
            Gson gson = new Gson();
            BufferedReader reader = req.getReader();
            JsonObject data = gson.fromJson(reader, JsonObject.class);

            int userId = data.get("id").getAsInt();
            String newName = data.get("fullName").getAsString();

            
            Class.forName("oracle.jdbc.driver.OracleDriver");
            try (Connection conn = DriverManager.getConnection(URL, USER, PASS)) {
                String sql = "UPDATE users SET full_name = ? WHERE user_id = ?";
                PreparedStatement stmt = conn.prepareStatement(sql);
                stmt.setString(1, newName);
                stmt.setInt(2, userId);

                int rowsUpdated = stmt.executeUpdate();

                if (rowsUpdated > 0) {
                    resp.getWriter().write("{\"message\": \"Name updated successfully\"}");
                } else {
                    resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    resp.getWriter().write("{\"error\": \"User not found\"}");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "PUT, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setStatus(HttpServletResponse.SC_OK);
    }
}