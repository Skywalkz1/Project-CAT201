package com.hoodtech.model;

public class Laptop {
    private int id;
    private String name;
    private String spec;
    private String[] badge; // Array for ["QHD", "RTX50"]
    private double basePrice;
    private double maxPrice;
    private String img;

    public Laptop(int id, String name, String spec, String badgeStr, double basePrice, double maxPrice, String img) {
        this.id = id;
        this.name = name;
        this.spec = spec;
        // Convert the database string "QHD,240Hz" into the array ["QHD", "240Hz"]
        this.badge = (badgeStr != null) ? badgeStr.split(",") : new String[]{};
        this.basePrice = basePrice;
        this.maxPrice = maxPrice;
        this.img = img;
    }

    // Getters (Required for Gson to convert to JSON)
    public int getId() { return id; }
    public String getName() { return name; }
    public String getSpec() { return spec; }
    public String[] getBadge() { return badge; }
    public double getBasePrice() { return basePrice; }
    public double getMaxPrice() { return maxPrice; }
    public String getImg() { return img; }
}