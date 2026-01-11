package com.hoodtech.model;
import java.util.ArrayList;
import java.util.List;

public class Category {
    private String id;
    private String name;
    private List<Product> products = new ArrayList<>();

    public Category(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public void addProduct(Product p) {
        this.products.add(p);
    }
    // Getters required
}