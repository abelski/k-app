package com.epam.k.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Comment {
    @Id
    private String id;
    private User author;
    private String text;

    public String getId() {
        return id;
    }

    public Comment setId(final String id) {
        this.id = id;
        return this;
    }

    public User getAuthor() {
        return author;
    }

    public Comment setAuthor(final User author) {
        this.author = author;
        return this;
    }

    public String getText() {
        return text;
    }

    public Comment setText(final String text) {
        this.text = text;
        return this;
    }
}
