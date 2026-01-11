package com.hoodtech.model;

public class QuotationHistoryItem {
    private String quoteId;
    private String date;
    private double total;

    public QuotationHistoryItem(String quoteId, String date, double total) {
        this.quoteId = quoteId;
        this.date = date;
        this.total = total;
    }
    
}