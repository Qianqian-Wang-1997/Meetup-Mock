package com.ECE651.cultureMingle.repository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@AutoConfigureDataMongo
class GroupRepositoryTest {

    @BeforeEach
    void setUp() {
    }

  @Test
  void testFindById() {
    System.out.println("ok");
  }
}