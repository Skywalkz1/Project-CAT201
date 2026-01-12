package com.hoodtech.model;

public class Order {
    private String orderId;
    private int userId;
    private double total;
    private String date; 
    private String status;
    private int itemCount;

    public Order(String orderId, int userId, double total, String date, String status, int itemCount) {
        this.orderId = orderId;
        this.userId = userId;
        this.total = total;
        this.date = date;
        this.status = status;
        this.itemCount = itemCount;
    }
    
}