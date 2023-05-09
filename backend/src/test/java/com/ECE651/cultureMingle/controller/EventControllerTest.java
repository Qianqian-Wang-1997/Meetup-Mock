package com.ECE651.cultureMingle.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ECE651.cultureMingle.model.Event;
import com.ECE651.cultureMingle.model.User;
import com.ECE651.cultureMingle.service.EventServiceImpl;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = EventController.class)
@AutoConfigureMockMvc(addFilters = false)
class EventControllerTest {

  @Autowired private MockMvc mockMvc;

  @MockBean private EventServiceImpl eventService;

  private List<Event> events;

  private Event testEvent;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    Event event1 = new Event();
    event1.setId("testid");
    Event event2 = new Event();
    //        testEvent.setId("testid1");
    User testUser = new User();
    testUser.setId("testidU");
  }

  @Test
  void getAllEvent() throws Exception {
    when(eventService.getAllEvent()).thenReturn(events);
    mockMvc.perform(get("/events")).andDo(print()).andExpect(status().isOk());
  }

  @Test
  void getEventById() throws Exception {
    when(eventService.getEventById("testid")).thenReturn(testEvent);
    mockMvc.perform(get("/events/testid")).andDo(print()).andExpect(status().isOk());
  }

  @Test
  void createEvent() throws Exception {
    Event testeventlocal = new Event();
    testeventlocal.setId("testidlocal");
    when(eventService.createEvent(testeventlocal)).thenReturn(testeventlocal);
    mockMvc.perform(get("/events/testidlocal")).andDo(print()).andExpect(status().isOk());
  }

  @Test
  void updateEvent() throws Exception {
    Event testeventlocal = new Event();
    testeventlocal.setId("testidlocal");
    when(eventService.updateEvent(testeventlocal)).thenReturn(testeventlocal);
    mockMvc.perform(get("/events/testidlocal")).andDo(print()).andExpect(status().isOk());
  }

  @Test
  void joinEvent() throws Exception {
    //        when(eventService.joinEvent("testidU", "testid")).thenReturn(testEvent);
    //        mockMvc.perform(put("/events/testid"))
    //                .andDo(print())
    //                .andExpect(status().isOk());
  }

  @Test
  void deleteEvent() throws Exception {
    String id = "testid";

    // No need to mock any return value as the method returns void
    doNothing().when(eventService).deleteEvent(id);

    mockMvc.perform(delete("/events/" + id)).andDo(print()).andExpect(status().isOk());

    // Verify that the deleteEvent method of EventService is called with the expected parameter
    //        verify(eventService, times(1)).deleteEvent(id);

    //        when(eventService.deleteEvent("testid")).thenReturn(true);
    //        mockMvc.perform(delete("/events/testid"))
    //                .andDo(print())
    //                .andExpect(status().isOk());
  }
}
