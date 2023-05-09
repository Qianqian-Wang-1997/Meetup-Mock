package com.ECE651.cultureMingle.service;

import com.ECE651.cultureMingle.model.User;

public interface UserService {
  User createUser(User user);

  User updateUser(User user);

  User getUserById(String id);

  void deleteUser(String id);
}
