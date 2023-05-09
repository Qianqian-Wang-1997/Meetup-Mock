package com.ECE651.cultureMingle.model;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document(collection = "user")
public class User {

  @Id private String id;

  @NotBlank
  @Size(max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 120)
  private String password;

  @DBRef private Set<Role> roles = new HashSet<>();

  public User() {}

  public User(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public User(String username, String email, String password, String gender, String dateOfBirth) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
  }

  private String gender;

  //  e.g(2022-01-01)
  private String dateOfBirth;

  private String description;

  private String avatar;

  private Set<String> eventHistory = new HashSet<>();

  private Set<String> groups = new HashSet<>();
}
