package com.spring.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String userId;
    private String UserName;
    private String Password;
    private String email;
    private String PhoneNumber;
    private String Profile_image;
    private String About;
}
