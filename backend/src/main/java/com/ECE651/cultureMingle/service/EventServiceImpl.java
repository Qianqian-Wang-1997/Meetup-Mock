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
public class EventServiceImpl implements EventService {

  @Autowired private EventRepository eventRepository;

  @Autowired private GroupRepository groupRepository;

  @Autowired private UserRepository userRepository;

  @Override
  public Event createEvent(Event event) {

    event.setAttendees(new HashSet<>());

    return eventRepository.save(event);
  }

  @Override
  public Event updateEvent(Event event) {

    Optional<Event> eventDb = eventRepository.findById(event.getId());

    if (eventDb.isPresent()) {

      Event eventUpdate = eventDb.get();

      if (event.getTitle() != null) {
        eventUpdate.setTitle(event.getTitle());
      }
      if (event.getDescription() != null) {
        eventUpdate.setDescription(event.getDescription());
      }
      if (event.getVenue() != null) {
        eventUpdate.setVenue(event.getVenue());
      }
      if (event.getTime() != null) {
        eventUpdate.setTime(event.getTime());
      }
      if (event.getImageUrls() != null) {
        eventUpdate.setImageUrls(event.getImageUrls());
      }

      eventRepository.save(eventUpdate);

      return eventUpdate;

    } else {
      throw new ResourceNotFoundException("Event not found with id: " + event.getId());
    }
  }

  @Override
  public Event joinEvent(String userId, String eventId) {

    Optional<Event> eventDb = eventRepository.findById(eventId);
    Optional<User> userDb = userRepository.findById(userId);

    if (eventDb.isPresent() && userDb.isPresent()) {

      Event eventUpdate = eventDb.get();
      Set<String> attendees = eventUpdate.getAttendees();
      attendees.add(userId);
      eventUpdate.setAttendees(attendees);
      eventRepository.save(eventUpdate);

      User userUpdate = userDb.get();
      Set<String> eventHistory = userUpdate.getEventHistory();
      eventHistory.add(eventId);
      userUpdate.setEventHistory(eventHistory);
      userRepository.save(userUpdate);

      return eventUpdate;

    } else if (!eventDb.isPresent()) {
      throw new ResourceNotFoundException("Event not found with id: " + eventId);
    } else {
      throw new ResourceNotFoundException("User not found with id: " + userId);
    }
  }

  @Override
  public Event hostEvent(String userId, String eventId) {

    Optional<Event> eventDb = eventRepository.findById(eventId);
    Optional<User> userDb = userRepository.findById(userId);

    if (eventDb.isPresent() && userDb.isPresent()) {

      Event eventUpdate = eventDb.get();
      eventUpdate.setHost(userId);
      eventRepository.save(eventUpdate);

      User userUpdate = userDb.get();
      Set<String> eventHistory = userUpdate.getEventHistory();
      eventHistory.add(eventId);
      userUpdate.setEventHistory(eventHistory);
      userRepository.save(userUpdate);

      return eventUpdate;

    } else if (!eventDb.isPresent()) {
      throw new ResourceNotFoundException("Event not found with id: " + eventId);
    } else {
      throw new ResourceNotFoundException("User not found with id: " + userId);
    }
  }

  @Override
  public Event bindEvent(String groupId, String eventId) {

    Optional<Event> eventDb = eventRepository.findById(eventId);
    Optional<Group> groupDb = groupRepository.findById(groupId);

    if (eventDb.isPresent() && groupDb.isPresent()) {

      Event eventUpdate = eventDb.get();
      eventUpdate.setGroup(groupId);
      eventRepository.save(eventUpdate);

      Group groupUpdate = groupDb.get();
      Set<String> events = groupUpdate.getEvents();
      events.add(eventId);
      groupUpdate.setEvents(events);
      groupRepository.save(groupUpdate);

      return eventUpdate;

    } else if (!eventDb.isPresent()) {
      throw new ResourceNotFoundException("Event not found with id: " + eventId);
    } else {
      throw new ResourceNotFoundException("Group not found with id: " + groupId);
    }
  }

  @Override
  public List<Event> getAllEvent() {
    return eventRepository.findAll();
  }

  @Override
  public Event getEventById(String id) {

    Optional<Event> eventDb = eventRepository.findById(id);

    if (eventDb.isPresent()) {
      return eventDb.get();
    } else {
      throw new ResourceNotFoundException("Event not found with id: " + id);
    }
  }

  @Override
  public void deleteEvent(String id) {

    Optional<Event> eventDb = eventRepository.findById(id);

    if (eventDb.isPresent()) {

      Event event = eventDb.get();

      String host = event.getHost();
      Optional<User> userDb = userRepository.findById(host);
      if (userDb.isPresent()) {
        User userUpdate = userDb.get();
        Set<String> eventHistory = userUpdate.getEventHistory();
        eventHistory.remove(id);
        userUpdate.setEventHistory(eventHistory);
        userRepository.save(userUpdate);
      }

      String group = event.getGroup();
      Optional<Group> groupDb = groupRepository.findById(group);
      if (groupDb.isPresent()) {
        Group groupUpdate = groupDb.get();
        Set<String> events = groupUpdate.getEvents();
        events.remove(id);
        groupUpdate.setEvents(events);
        groupRepository.save(groupUpdate);
      }

      Set<String> attendees = event.getAttendees();
      for (String attendee : attendees) {
        userDb = userRepository.findById(attendee);
        if (userDb.isPresent()) {
          User userUpdate = userDb.get();
          Set<String> eventHistory = userUpdate.getEventHistory();
          eventHistory.remove(id);
          userUpdate.setEventHistory(eventHistory);
          userRepository.save(userUpdate);
        }
      }

      eventRepository.delete(eventDb.get());

    } else {
      throw new ResourceNotFoundException("Event not found with id: " + id);
    }
  }
}
