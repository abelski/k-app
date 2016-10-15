package com.epam.k.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Transport {
    @Id
    private String id;
    private String type;

    public String getId() {
        return id;
    }

    public Transport setId(final String id) {
        this.id = id;
        return this;
    }

    public String getType() {
        return type;
    }

    public Transport setType(final String type) {
        this.type = type;
        return this;
    }
}
