package com.zealthy.onboarding.controller;

import com.zealthy.onboarding.model.User;
import com.zealthy.onboarding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    /**
     * Create one user
     * POST http://localhost:8080/api/users
     */
    @PostMapping("/api/users")
    public User saveUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    /**
     * List all users (for React DataTable)
     * GET http://localhost:8080/api/users
     */
    @GetMapping("/api/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * (Optional) Legacy endpoint if you still need GET /api/user/all
     */
    @GetMapping("/api/user/all")
    public List<User> getAllUsersLegacy() {
        return userRepository.findAll();
    }
}


