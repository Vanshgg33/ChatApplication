package com.spring.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private static String secret_key = "8f7d3b92e61a4c5f0d8e9c7b6a5f4e3d2c1b0a9876543210fedcba9876543210";
    private static long expire_TIME = 1000*60*60*60;

    private static Key getSigningkey(){
        return Keys.hmacShaKeyFor(secret_key.getBytes());
    }
    public static String generateToken(String username){
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+expire_TIME))
                .signWith(getSigningkey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token){
        return Jwts.parser()
                .setSigningKey(getSigningkey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    public boolean validateToken(String token,String username){
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }

    public boolean validateToken2(String token){
        try{
            Jwts.parser()
                    .setSigningKey(secret_key)
                    .build()
                    .parseClaimsJwt(token);
            return true;
        } catch (JwtException | IllegalArgumentException e){
            return false;
        }
    }
    public boolean isTokenExpired(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(getSigningkey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getExpiration().before(new Date());
        } catch (JwtException e) {

            return true; // Treat any exception as expired/invalid
        }
    }

}
