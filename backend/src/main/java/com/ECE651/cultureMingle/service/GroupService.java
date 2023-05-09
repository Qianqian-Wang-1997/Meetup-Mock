package com.ECE651.cultureMingle.service;

import com.ECE651.cultureMingle.model.Group;
import java.util.List;

public interface GroupService {

  Group createGroup(Group group);

  Group updateGroup(Group group);

  Group joinGroup(String userId, String groupId);

  Group organizeGroup(String userId, String groupId);

  List<Group> getAllGroup();

  Group getGroupById(String id);

  void deleteGroup(String id);
}
