package com.ECE651.cultureMingle.controller;

import com.ECE651.cultureMingle.model.User;
import com.ECE651.cultureMingle.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
  @Autowired private UserService userService;

  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable String id) {
    return ResponseEntity.ok().body(userService.getUserById(id));
  }
}
