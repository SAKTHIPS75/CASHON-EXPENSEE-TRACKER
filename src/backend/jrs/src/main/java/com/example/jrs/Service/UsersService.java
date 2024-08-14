package com.example.jrs.Service;

import com.example.jrs.Model.Users;
import com.example.jrs.Repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class UsersService {

    @Autowired
    private UsersRepo userRepository;

    public Users addUser(Users user) {
        return userRepository.save(user);
    }

    public boolean authenticate(String email, String password) {
        Users user = userRepository.findByEmail(email);
        return user != null && user.getPassword().equals(password);
    }

    public Users findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}