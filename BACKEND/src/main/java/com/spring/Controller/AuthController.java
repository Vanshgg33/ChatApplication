package com.spring.Controller;

import com.spring.jwt.JwtUtil;
import com.spring.model.LoginRequest;
import com.spring.model.User;
import com.spring.repo.UserRepository;
import com.spring.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;
//    @Autowired
//    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
        if (user == null || !user.getPassword().equals(loginRequest.getPassword())) {
            throw new BadCredentialsException("Invalid Credentials");
        }
        String token = jwtUtil.generateToken(loginRequest.getEmail());
        ResponseCookie cookie = ResponseCookie.from("authToken", token)
                .httpOnly(true)
                .path("/")
                .maxAge(24 * 60 * 60) // 1 day
                .secure(false) // set to true in production (HTTPS)
                .sameSite("Lax")
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(Collections.singletonMap("token", token));
    }
//---- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@CookieValue(name = "authToken", required = false) String authHeader) {


        if (authHeader == null || authHeader.isEmpty()) {
            System.out.println("Invalid JWT token: null or empty");
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Invalid or missing token"));
        }

        try {
            boolean expired = jwtUtil.isTokenExpired(authHeader);
            if (expired) {
                System.out.println("Expired token");
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Token is expired"));
            }

            // Refresh the cookie (optional but good practice)
            ResponseCookie cookie = ResponseCookie.from("authToken", authHeader)
                    .httpOnly(true)
                    .path("/")
                    .maxAge(24 * 60 * 60)
                    .secure(false) // use true in production (HTTPS)
                    .sameSite("Lax")
                    .build();

            return ResponseEntity
                    .ok()
                    .header("Set-Cookie", cookie.toString())
                    .body(Map.of("message", "Token is valid"));

        } catch (ExpiredJwtException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Token is expired"));
        } catch (MalformedJwtException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Malformed token"));
        } catch (SignatureException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid token signature"));
        } catch (Exception e) {
            e.printStackTrace(); // optional: helpful during debugging
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid or unreadable token"));
        }
    }

}
