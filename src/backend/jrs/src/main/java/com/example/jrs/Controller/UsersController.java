package com.example.jrs.Controller;

import com.example.jrs.Model.Users;
import com.example.jrs.Service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // Adjust this if your frontend runs on a different port
public class UsersController {

    @Autowired
    private UsersService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> addNewUser(@RequestBody Users user) {
        try {
            // Check if the user already exists
            if (userService.findByEmail(user.getEmail()) != null) {
                return new ResponseEntity<>("Email already exists.", HttpStatus.CONFLICT);
            }
            Users createdUser = userService.addUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            boolean isAuthenticated = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
            if (isAuthenticated) {
                return ResponseEntity.ok("{\"message\":\"Login successful\"}");
            } else {
                return new ResponseEntity<>("{\"message\":\"Invalid credentials\"}", HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DTO for login request
    public static class LoginRequest {
        private String email;
        private String password;

        // Getters and Setters
        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}