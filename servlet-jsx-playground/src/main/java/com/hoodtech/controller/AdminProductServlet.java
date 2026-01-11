package com.hoodtech.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.hoodtech.model.Product; 

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

@WebServlet("/api/admin/products")
public class AdminProductServlet extends HttpServlet {

    private static final String URL = "jdbc:oracle:thin:@//localhost:1521/xe";
    private static final String USER = "system";
    private static final String PASS = "1234";

   
    private void setupResponse(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
    }

    
    private JsonObject readBody(HttpServletRequest req) throws IOException {
        Gson gson = new Gson();
        BufferedReader reader = req.getReader();
        return gson.fromJson(reader, JsonObject.class);
    }

    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setupResponse(resp);
        JsonObject data = readBody(req);

        try (Connection conn = DriverManager.getConnection(URL, USER, PASS)) {
            String sql = "INSERT INTO products (prod_id, cat_id, prod_name, price) VALUES (?, ?, ?, ?)";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, data.get("id").getAsString());
            stmt.setString(2, data.get("category").getAsString());
            stmt.setString(3, data.get("name").getAsString());
            stmt.setDouble(4, data.get("price").getAsDouble());

            stmt.executeUpdate();
            resp.getWriter().write("{\"message\": \"Product Added Successfully\"}");
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(500);
            resp.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setupResponse(resp);
        JsonObject data = readBody(req);

        try (Connection conn = DriverManager.getConnection(URL, USER, PASS)) {
            String sql = "UPDATE products SET prod_name = ?, price = ?, cat_id = ? WHERE prod_id = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, data.get("name").getAsString());
            stmt.setDouble(2, data.get("price").getAsDouble());
            stmt.setString(3, data.get("category").getAsString());
            stmt.setString(4, data.get("id").getAsString());

            int rows = stmt.executeUpdate();
            if(rows > 0) resp.getWriter().write("{\"message\": \"Product Updated\"}");
            else resp.setStatus(404);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(500);
        }
    }

    
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setupResponse(resp);
        
        String prodId = req.getParameter("id");

        try (Connection conn = DriverManager.getConnection(URL, USER, PASS)) {
            String sql = "DELETE FROM products WHERE prod_id = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, prodId);

            stmt.executeUpdate();
            resp.getWriter().write("{\"message\": \"Product Deleted\"}");
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(500);
        }
    }

    
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setupResponse(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }
}