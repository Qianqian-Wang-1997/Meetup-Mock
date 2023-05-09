package com.ECE651.cultureMingle.controller;

import static org.junit.jupiter.api.Assertions.*;

import com.ECE651.cultureMingle.service.GroupServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = GroupController.class)
@AutoConfigureMockMvc(addFilters = false)
class GroupControllerTest {

  @Autowired private MockMvc mockMvc;
  @MockBean private GroupServiceImpl groupService;

  @BeforeEach
  void setUp() {}

  @Test
  void getAllGroup() {}

  @Test
  void getGroupById() {}

  @Test
  void createGroup() {}

  @Test
  void updateGroup() {}

  @Test
  void joinGroup() {}

  @Test
  void deleteGroup() {}
}
