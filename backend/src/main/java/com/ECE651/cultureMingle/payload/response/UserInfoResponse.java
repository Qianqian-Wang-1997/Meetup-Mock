package com.ECE651.cultureMingle.payload.response;

import lombok.Data;

@Data
public class UserInfoResponse {
  private String id;
  private String username;
  private String email;
  //    private List<String> roles;
  private String gender;

  private String dateOfBirth;

  private String jwt;

  public UserInfoResponse(
      String id, String username, String email, String jwt, String gender, String dateOfBirth) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.jwt = jwt;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getJWT() {
    return jwt;
  }

  public void setJWT(String jwt) {
    this.jwt = jwt;
  }
  //    public List<String> getRoles() {
  //        return roles;
  //    }
}
