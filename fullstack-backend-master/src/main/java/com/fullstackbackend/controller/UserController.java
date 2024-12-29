
package com.fullstackbackend.controller;


import com.fullstackbackend.model.User;
import com.fullstackbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        return userService.createUser(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        return userService.updateUser(id, newUser);
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }

    //stored procedure
    @GetMapping("/userssp")
    public List<User> get_All_Users() {
        return userService.get_All_Users();
    }

    //stored procedure
    @DeleteMapping("usersp/{id}")
    public ResponseEntity<String> delete_single_user(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/usersp/{id}")
    public ResponseEntity<?> update_single_user(@PathVariable Long id, @RequestBody User newUser) {
        try {
            User updatedUser = userService.update_single_user(id, newUser);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
