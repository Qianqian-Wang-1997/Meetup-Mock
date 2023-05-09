package com.ECE651.cultureMingle.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
public class Event {

  @Id private String id;

  private String title;

  private String description;

  private String venue;

  @NotBlank private String host;

  private String group;

  private Date time;

  private Set<String> attendees = new HashSet<>();

  private Set<String> imageUrls = new HashSet<>();

  @Override
  public String toString() {
    return "Event (id=" + id + ", title=" + title + ")";
  }
}
