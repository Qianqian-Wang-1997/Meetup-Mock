package com.ECE651.cultureMingle.model;

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
public class Group {

  @Id private String id;

  private String groupName;

  private String description;

  private String location;

  @NotBlank private String organizer;

  private String logoUrl;

  private Set<String> members = new HashSet<>();

  private Set<String> events = new HashSet<>();

  @Override
  public String toString() {
    return "Group (id=" + id + ", name=" + groupName + ")";
  }
}
