package com.epam.k.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Tag {
    @Id
    private String id;
    private String name;

    public String getId() {
        return id;
    }

    public Tag setId(final String id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Tag setName(final String name) {
        this.name = name;
        return this;
    }
}
