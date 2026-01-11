package com.hoodtech.controller;

import com.google.gson.Gson;
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

@WebServlet("/api/admin/quotations")
public class AdminQuotationHistoryServlet extends HttpServlet {

    private static final String URL = "jdbc:oracle:thin:@//localhost:1521/xe";
    private static final String USER = "system";
    private static final String PASS = "1234";

    // Inner class for data transfer
    class AdminQuoteDTO {
        String quoteId;
        String createdAt;
        double total;
        String userName;
        String userEmail;

        public AdminQuoteDTO(String qId, String date, double tot, String uName, String uEmail) {
            this.quoteId = qId;
            this.createdAt = date;
            this.total = tot;
            this.userName = uName;
            this.userEmail = uEmail;
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        List<AdminQuoteDTO> list = new ArrayList<>();

        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            try (Connection conn = DriverManager.getConnection(URL, USER, PASS)) {
                // Join Users and Quotations to get full info
                String sql = "SELECT q.quote_id, q.created_at, q.total_amount, u.full_name, u.email " +
                        "FROM quotations q " +
                        "JOIN users u ON q.user_id = u.user_id " +
                        "ORDER BY q.created_at DESC";

                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery();

                while (rs.next()) {
                    list.add(new AdminQuoteDTO(
                            rs.getString("quote_id"),
                            rs.getString("created_at"),
                            rs.getDouble("total_amount"),
                            rs.getString("full_name"),
                            rs.getString("email")
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
}