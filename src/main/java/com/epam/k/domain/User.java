package com.epam.k.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class User extends Principal {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String birth;
    private String region;
    private String skype;
    private String phone;
    private Image avatar;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getBirth() {
        return birth;
    }

    public User setBirth(String birth) {
        this.birth = birth;
        return this;
    }

    public String getRegion() {
        return region;
    }

    public User setRegion(String region) {
        this.region = region;
        return this;
    }
}
