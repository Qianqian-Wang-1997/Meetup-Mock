package com.ECE651.cultureMingle.repository;

import com.ECE651.cultureMingle.model.Event;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;

@SpringBootTest
@AutoConfigureDataMongo
class EventRepositoryTest {

    @Autowired
    private EventRepository eventRepository;

    private Event testEvent;

    @BeforeEach
    void setUp() {
        testEvent = new Event();
        testEvent.setId("1");
        testEvent.setTitle("Test Event");
        // Add more fields as needed

//        eventRepository.save(testEvent);
    }

//    @AfterEach
//    void tearDown() {
//        eventRepository.deleteAll();
//    }

    @Test
    void testFindById() {
        System.out.println("ok");
    }

}
