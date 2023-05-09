package com.ECE651.cultureMingle.repository;

import com.ECE651.cultureMingle.model.Group;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends MongoRepository<Group, String> {}
