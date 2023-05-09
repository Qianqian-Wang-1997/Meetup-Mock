package com.ECE651.cultureMingle.controller;

import static org.junit.jupiter.api.Assertions.*;

import com.ECE651.cultureMingle.repository.RoleRepository;
import com.ECE651.cultureMingle.repository.UserRepository;
import com.ECE651.cultureMingle.security.jwt.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {
  @Autowired private MockMvc mockMvc;

  @MockBean private AuthenticationManager authenticationManager;

  @MockBean private UserRepository userRepository;

  @MockBean private RoleRepository roleRepository;

  @MockBean private PasswordEncoder encoder;

  @MockBean private JwtUtils jwtUtils;

  @BeforeEach
  void setUp() {
    System.out.println("ok");
  }

  @Test
  void authenticateUser() {
    System.out.println("ok");
  }

  @Test
  void registerUser() {
    System.out.println("ok");
  }
}