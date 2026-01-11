package com.hoodtech.controller;

import com.google.gson.Gson;
import com.hoodtech.model.QuotationHistoryItem; // We will create this small model below

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/api/quotation/history")
public class QuotationHistoryServlet extends HttpServlet {

    private static final String URL = "jdbc:oracle:thin:@//localhost:1521/xe";
    private static final String USER = "system";
    private static final String PASS = "1234";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String userIdParam = req.getParameter("userId");
        if (userIdParam == null) {
            resp.setStatus(400);
            return;
        }

        List<QuotationHistoryItem> historyList = new ArrayList<>();

        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            try (Connection conn = DriverManager.getConnection(URL, USER, PASS)) {
                // Fetch quotations sorted by newest first
                String sql = "SELECT quote_id, created_at, total_amount FROM quotations WHERE user_id = ? ORDER BY created_at DESC";
                PreparedStatement stmt = conn.prepareStatement(sql);
                stmt.setInt(1, Integer.parseInt(userIdParam));

                ResultSet rs = stmt.executeQuery();
                while (rs.next()) {
                    historyList.add(new QuotationHistoryItem(
                            rs.getString("quote_id"),
                            rs.getString("created_at"), // Timestamp as string is fine for display
                            rs.getDouble("total_amount")
                    ));
                }
            }

            String json = new Gson().toJson(historyList);
            PrintWriter out = resp.getWriter();
            out.print(json);
            out.flush();

        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(500);
        }
    }
}