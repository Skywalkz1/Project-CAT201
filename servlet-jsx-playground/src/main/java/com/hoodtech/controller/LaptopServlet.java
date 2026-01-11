package com.hoodtech.controller;

import com.google.gson.Gson;
import com.hoodtech.model.Laptop;

// JAVAX Imports
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

@WebServlet("/api/products/*")
public class LaptopServlet extends HttpServlet {

    // UPDATE THESE CREDENTIALS
    private static final String DB_URL = "jdbc:oracle:thin:@localhost:1521:xe";
    private static final String DB_USER = "system";
    private static final String DB_PASS = "1234";

    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // CORS Headers for React
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "GET");
        resp.setHeader("Content-Type", "application/json");
        resp.setCharacterEncoding("UTF-8");

        String pathInfo = req.getPathInfo();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            if (pathInfo == null || pathInfo.equals("/")) {
                // Fetch ALL Laptops
                List<Laptop> laptops = getAllLaptops(conn);
                String json = gson.toJson(laptops);
                try (PrintWriter out = resp.getWriter()) {
                    out.print(json);
                }
            } else {
                // Fetch SINGLE Laptop by ID
                try {
                    String idStr = pathInfo.substring(1);
                    int id = Integer.parseInt(idStr);
                    Laptop laptop = getLaptopById(conn, id);

                    if (laptop != null) {
                        String json = gson.toJson(laptop);
                        try (PrintWriter out = resp.getWriter()) {
                            out.print(json);
                        }
                    } else {
                        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        resp.getWriter().write("{}");
                    }
                } catch (NumberFormatException e) {
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    // --- Helper Methods ---

    private List<Laptop> getAllLaptops(Connection conn) throws SQLException {
        List<Laptop> list = new ArrayList<>();
        String sql = "SELECT * FROM laptops ORDER BY id";
        try (Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                list.add(mapRow(rs));
            }
        }
        return list;
    }

    private Laptop getLaptopById(Connection conn, int id) throws SQLException {
        String sql = "SELECT * FROM laptops WHERE id = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return mapRow(rs);
                }
            }
        }
        return null;
    }

    private Laptop mapRow(ResultSet rs) throws SQLException {
        return new Laptop(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("spec"),
                rs.getString("badge"),
                rs.getDouble("base_price"),
                rs.getDouble("max_price"),
                rs.getString("img_url")
        );
    }
}