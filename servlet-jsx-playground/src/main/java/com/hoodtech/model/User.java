package com.hoodtech.model;

public class User {
    private int id;
    private String fullName;
    private String email;
    private String role; 

    public User(int id, String fullName, String email, String role) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.role = role; 
    }
}