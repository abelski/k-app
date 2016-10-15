package com.epam.k.web.dto;

import com.epam.k.domain.Tag;
import com.epam.k.domain.Transport;
import com.epam.k.domain.User;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class FilterDTO {
    private String ownerId;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate startDate;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate endDate;
    private List<Tag> tags;
    private List<User> members;
    private Transport transport;
    private String countryToGo;
    private String cityToGo;
    private BigDecimal estimatedCost;

    public String getOwnerId() {
        return ownerId;
    }

    public FilterDTO setOwnerId(final String ownerId) {
        this.ownerId = ownerId;
        return this;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public FilterDTO setStartDate(final LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public FilterDTO setEndDate(final LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public FilterDTO setTags(final List<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public List<User> getMembers() {
        return members;
    }

    public FilterDTO setMembers(final List<User> members) {
        this.members = members;
        return this;
    }

    public String getCountryToGo() {
        return countryToGo;
    }

    public FilterDTO setCountryToGo(final String countryToGo) {
        this.countryToGo = countryToGo;
        return this;
    }

    public String getCityToGo() {
        return cityToGo;
    }

    public FilterDTO setCityToGo(final String cityToGo) {
        this.cityToGo = cityToGo;
        return this;
    }

    public BigDecimal getEstimatedCost() {
        return estimatedCost;
    }

    public FilterDTO setEstimatedCost(final BigDecimal estimatedCost) {
        this.estimatedCost = estimatedCost;
        return this;
    }

    public Transport getTransport() {
        return transport;
    }

    public FilterDTO setTransport(Transport transport) {
        this.transport = transport;
        return this;
    }
}
