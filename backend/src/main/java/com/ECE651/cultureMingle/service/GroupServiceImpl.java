package com.ECE651.cultureMingle.service;

import com.ECE651.cultureMingle.exception.ResourceNotFoundException;
import com.ECE651.cultureMingle.model.Event;
import com.ECE651.cultureMingle.model.Group;
import com.ECE651.cultureMingle.model.User;
import com.ECE651.cultureMingle.repository.EventRepository;
import com.ECE651.cultureMingle.repository.GroupRepository;
import com.ECE651.cultureMingle.repository.UserRepository;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class GroupServiceImpl implements GroupService {

  @Autowired private EventRepository eventRepository;

  @Autowired private GroupRepository groupRepository;

  @Autowired private UserRepository userRepository;

  @Override
  public Group createGroup(Group group) {

    group.setEvents(new HashSet<>());
    group.setMembers(new HashSet<>());

    return groupRepository.save(group);
  }

  @Override
  public Group updateGroup(Group group) {

    Optional<Group> groupDb = groupRepository.findById(group.getId());

    if (groupDb.isPresent()) {

      Group groupUpdate = groupDb.get();

      if (group.getGroupName() != null) {
        groupUpdate.setGroupName(group.getGroupName());
      }
      if (group.getDescription() != null) {
        groupUpdate.setDescription(group.getDescription());
      }
      if (group.getLocation() != null) {
        groupUpdate.setLocation(group.getLocation());
      }
      if (group.getLogoUrl() != null) {
        groupUpdate.setLogoUrl(group.getLogoUrl());
      }

      groupRepository.save(groupUpdate);

      return groupUpdate;

    } else {
      throw new ResourceNotFoundException("Group not found with id: " + group.getId());
    }
  }

  @Override
  public Group joinGroup(String userId, String groupId) {

    Optional<Group> groupDb = groupRepository.findById(groupId);
    Optional<User> userDb = userRepository.findById(userId);

    if (groupDb.isPresent() && userDb.isPresent()) {

      Group groupUpdate = groupDb.get();
      Set<String> members = groupUpdate.getMembers();
      members.add(userId);
      groupUpdate.setMembers(members);
      groupRepository.save(groupUpdate);

      User userUpdate = userDb.get();
      Set<String> groups = userUpdate.getGroups();
      groups.add(groupId);
      userUpdate.setGroups(groups);
      userRepository.save(userUpdate);

      return groupUpdate;

    } else if (!groupDb.isPresent()) {
      throw new ResourceNotFoundException("Group not found with id: " + groupId);
    } else {
      throw new ResourceNotFoundException("User not found with id: " + userId);
    }
  }

  @Override
  public Group organizeGroup(String userId, String groupId) {

    Optional<Group> groupDb = groupRepository.findById(groupId);
    Optional<User> userDb = userRepository.findById(userId);

    if (groupDb.isPresent() && userDb.isPresent()) {

      Group groupUpdate = groupDb.get();
      groupUpdate.setOrganizer(userId);
      groupRepository.save(groupUpdate);

      User userUpdate = userDb.get();
      Set<String> groups = userUpdate.getGroups();
      groups.add(groupId);
      userUpdate.setGroups(groups);
      userRepository.save(userUpdate);

      return groupUpdate;

    } else if (!groupDb.isPresent()) {
      throw new ResourceNotFoundException("Group not found with id: " + groupId);
    } else {
      throw new ResourceNotFoundException("User not found with id: " + userId);
    }
  }

  @Override
  public List<Group> getAllGroup() {
    return groupRepository.findAll();
  }

  @Override
  public Group getGroupById(String id) {

    Optional<Group> groupDb = groupRepository.findById(id);

    if (groupDb.isPresent()) {
      return groupDb.get();
    } else {
      throw new ResourceNotFoundException("Group not found with id: " + id);
    }
  }

  @Override
  public void deleteGroup(String id) {

    Optional<Group> groupDb = groupRepository.findById(id);

    if (groupDb.isPresent()) {

      Group group = groupDb.get();

      String organizer = group.getOrganizer();
      Optional<User> userDb = userRepository.findById(organizer);
      if (userDb.isPresent()) {
        User userUpdate = userDb.get();
        Set<String> groups = userUpdate.getGroups();
        groups.remove(id);
        userUpdate.setGroups(groups);
        userRepository.save(userUpdate);
      }

      Set<String> members = group.getMembers();
      for (String member : members) {
        userDb = userRepository.findById(member);
        if (userDb.isPresent()) {
          User userUpdate = userDb.get();
          Set<String> groups = userUpdate.getGroups();
          groups.remove(id);
          userUpdate.setGroups(groups);
          userRepository.save(userUpdate);
        }
      }

      Set<String> events = group.getEvents();
      for (String event : events) {
        Optional<Event> eventDb = eventRepository.findById(event);
        if (eventDb.isPresent()) {
          Event eventUpdate = eventDb.get();
          eventUpdate.setGroup(null);
          eventRepository.save(eventUpdate);
        }
      }

      groupRepository.delete(groupDb.get());

    } else {
      throw new ResourceNotFoundException("Group not found with id: " + id);
    }
  }
}
