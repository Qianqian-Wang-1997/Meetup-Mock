package com.ECE651.cultureMingle.controller;

import com.ECE651.cultureMingle.model.Role;
import com.ECE651.cultureMingle.model.User;
import com.ECE651.cultureMingle.service.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.HashSet;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import static com.ECE651.cultureMingle.model.ERole.ROLE_USER;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = UserController.class)
@AutoConfigureMockMvc(addFilters = false)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

  @MockBean private UserServiceImpl userService;

    private User user;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setId("testid");
        user.setEmail("aosenxiong@gmail.com");
        user.setDateOfBirth("2022-02-02");
        user.setAvatar("www.test.com");
        user.setGender("male");
        user.setPassword("12345678");
        user.setRoles(new HashSet<>(Collections.singleton(new Role(ROLE_USER))));
        user.setGroups(new HashSet<>(Collections.singleton("1")));
        user.setEventHistory(new HashSet<>(Collections.singleton("1")));
        user.setDescription("Greetings");
        user.setUsername("aosenxiong");
    }

    @Test
    public void testGetUserById() throws Exception {
        when(userService.getUserById("testid")).thenReturn(user);

        mockMvc.perform(get("/users/testid"))
                .andDo(print())
                .andExpect(status().isOk());

//        ResponseEntity<User> responseEntity = userController.getUserById("1");
//        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//        assertEquals(user, responseEntity.getBody());
    }
}
