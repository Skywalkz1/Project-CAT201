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
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/api/admin/tickets")
public class AdminSupportTicketServlet extends HttpServlet {

    private static final String URL = "jdbc:oracle:thin:@//localhost:1521/xe";
    private static final String USER = "system";
    private static final String PASS = "1234";

    // Inner DTO class
    class TicketDTO {
        int id;
        String name;
        String email;
        String orderId;
        String message;
        String status;
        String date;

        public TicketDTO(int id, String name, String email, String orderId, String message, String status, String date) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.orderId = orderId;
            this.message = message;
            this.status = status;
            this.date = date;
        }
    }

    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setupHeaders(resp);
        List<TicketDTO> list = new ArrayList<>();

        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            try (Connection conn = DriverManager.getConnection(URL, USER, PASS)) {
                String sql = "SELECT ticket_id, name, email, order_id, message, status, created_at FROM support_tickets ORDER BY created_at DESC";
                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery();

                while (rs.next()) {
                    list.add(new TicketDTO(
                            rs.getInt("ticket_id"),
                            rs.getString("name"),
                            rs.getString("email"),
                            rs.getString("order_id"),
                            rs.getString("message"),
                            rs.getString("status"),
                            rs.getString("created_at")
                    ));
                }
            }
            String json = new Gson().toJson(list);
            PrintWriter out = resp.getWriter();
            out.print(json);
            out.flush();
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(500);
        }
    }

    
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setupHeaders(resp);
        try {
            Gson gson = new Gson();
            BufferedReader reader = req.getReader();
            JsonObject data = gson.fromJson(reader, JsonObject.class);

            int id = data.get("id").getAsInt();
            String status = data.get("status").getAsString();

            Class.forName("oracle.jdbc.driver.OracleDriver");
            try (Connection conn = DriverManager.getConnection(URL, USER, PASS)) {
                String sql = "UPDATE support_tickets SET status = ? WHERE ticket_id = ?";
                PreparedStatement stmt = conn.prepareStatement(sql);
                stmt.setString(1, status);
                stmt.setInt(2, id);
                stmt.executeUpdate();

                resp.getWriter().write("{\"message\": \"Status updated\"}");
            }
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(500);
        }
    }

    
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setupHeaders(resp);
        resp.setStatus(200);
    }

    private void setupHeaders(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
    }
}