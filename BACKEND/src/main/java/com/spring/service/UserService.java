package com.spring.service;



import com.spring.model.User;
import com.spring.model.UserShow;
import com.spring.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u1 = userRepository.findByEmail(username);
        if(u1 == null){
            System.out.println("user not found");
            throw new UsernameNotFoundException("user not found");
        }

        return  new UserShow(u1);
    }
    }

