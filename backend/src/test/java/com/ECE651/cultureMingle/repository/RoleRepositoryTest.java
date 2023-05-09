package com.ECE651.cultureMingle.repository;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@AutoConfigureDataMongo
class RoleRepositoryTest {

  @BeforeEach
  void setUp() {}

  @Test
  void findByName() {
    System.out.println("ok");
  }
}