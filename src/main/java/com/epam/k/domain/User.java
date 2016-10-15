package com.epam.k.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class User {
    @Id
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String skype;
    private String phone;
    private Image avatar;
    private String token;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public User setFirstName(final String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public User setLastName(final String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getSkype() {
        return skype;
    }

    public User setSkype(final String skype) {
        this.skype = skype;
        return this;
    }

    public String getPhone() {
        return phone;
    }

    public User setPhone(final String phone) {
        this.phone = phone;
        return this;
    }

    public Image getAvatar() {
        return avatar;
    }

    public User setAvatar(final Image avatar) {
        this.avatar = avatar;
        return this;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
