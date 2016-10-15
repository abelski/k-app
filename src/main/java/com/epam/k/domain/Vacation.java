package com.epam.k.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document
public class Vacation {
    @Id
    private String id;
    private String title;
    private User owner;
    private String description;
    private Image image;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate startDate;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate endDate;
    private List<User> participants;
    private List<Comment> comments;
    private List<Activity> activities;
    private List<Tag> tags;
    private Transport transport;

    public String getId() {
        return id;
    }

    public Vacation setId(String id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public Vacation setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Vacation setDescription(String description) {
        this.description = description;
        return this;
    }

    public Image getImage() {
        return image;
    }

    public Vacation setImage(Image image) {
        this.image = image;
        return this;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Vacation setStartDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Vacation setEndDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public List<User> getParticipants() {
        return participants;
    }

    public Vacation setParticipants(List<User> participants) {
        this.participants = participants;
        return this;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public Vacation setComments(List<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public Vacation setActivities(List<Activity> activities) {
        this.activities = activities;
        return this;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public Vacation setTags(List<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public Transport getTransport() {
        return transport;
    }

    public Vacation setTransport(Transport transport) {
        this.transport = transport;
        return this;
    }

    public User getOwner() {
        return owner;
    }

    public Vacation setOwner(User owner) {
        this.owner = owner;
        return this;
    }
}
