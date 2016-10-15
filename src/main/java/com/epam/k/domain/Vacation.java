package com.epam.k.domain;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.epam.k.domain.enums.VacationStatus;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

@Document
public class Vacation {
    @Id
    private String id;
    private User owner;
    private List<User> members;
    private String title;
    private String description;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate beginDate;
    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private LocalDate endDate;
    private String countryToGo;
    private String cityToGo;
    private List<Tag> tags;
    private BigDecimal estimatedCost;
    private int minMembers;
    private VacationStatus status;
    private List<Activity> plannedActivities;
    private List<Comment> comments;
    private List<Image> gallery;
    private Image titleImg;
    private Transport transport;
    private int days;
    private String departureCountry;

    public String getId() {
        return id;
    }

    public Vacation setId(final String id) {
        this.id = id;
        return this;
    }

    public User getOwner() {
        return owner;
    }

    public Vacation setOwner(final User owner) {
        this.owner = owner;
        return this;
    }

    public List<User> getMembers() {
        return members;
    }

    public Vacation setMembers(final List<User> members) {
        this.members = members;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public Vacation setTitle(final String title) {
        this.title = title;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Vacation setDescription(final String description) {
        this.description = description;
        return this;
    }

    public LocalDate getBeginDate() {
        return beginDate;
    }

    public Vacation setBeginDate(final LocalDate beginDate) {
        this.beginDate = beginDate;
        return this;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Vacation setEndDate(final LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public String getCountryToGo() {
        return countryToGo;
    }

    public Vacation setCountryToGo(final String countryToGo) {
        this.countryToGo = countryToGo;
        return this;
    }

    public String getCityToGo() {
        return cityToGo;
    }

    public Vacation setCityToGo(final String cityToGo) {
        this.cityToGo = cityToGo;
        return this;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public Vacation setTags(final List<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public BigDecimal getEstimatedCost() {
        return estimatedCost;
    }

    public Vacation setEstimatedCost(final BigDecimal estimatedCost) {
        this.estimatedCost = estimatedCost;
        return this;
    }

    public int getMinMembers() {
        return minMembers;
    }

    public Vacation setMinMembers(final int minMembers) {
        this.minMembers = minMembers;
        return this;
    }

    public VacationStatus getStatus() {
        return status;
    }

    public Vacation setStatus(final VacationStatus status) {
        this.status = status;
        return this;
    }

    public List<Activity> getPlannedActivities() {
        return plannedActivities;
    }

    public Vacation setPlannedActivities(final List<Activity> plannedActivities) {
        this.plannedActivities = plannedActivities;
        return this;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public Vacation setComments(final List<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public List<Image> getGallery() {
        return gallery;
    }

    public Vacation setGallery(final List<Image> gallery) {
        this.gallery = gallery;
        return this;
    }

    public Image getTitleImg() {
        return titleImg;
    }

    public int getDays() {
        return days;
    }

    public String getDepartureCountry() {
        return departureCountry;
    }

    public void setDays(int days) {
        this.days = days;
    }

    public Vacation setTitleImg(final Image titleImg) {
        this.titleImg = titleImg;
        return this;
    }

    public void setDepartureCountry(String departureCountry) {
        this.departureCountry = departureCountry;
    }

    public Transport getTransport() {
        return transport;
    }

    public void setTransport(Transport transport) {
        this.transport = transport;
    }
}
