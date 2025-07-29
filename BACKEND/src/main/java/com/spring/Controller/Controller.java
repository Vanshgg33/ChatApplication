package com.spring.Controller;

import com.spring.jwt.JwtUtil;
import com.spring.model.User;
import com.spring.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;



    @PostMapping("/SaveNewUser")
    public ResponseEntity<?> SaveNewUser(@RequestBody User user) {
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
}
