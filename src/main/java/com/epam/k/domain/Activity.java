package com.epam.k.domain;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Activity {
    private String title;

    public String getTitle() {
        return title;
    }

    public Activity setTitle(final String title) {
        this.title = title;
        return this;
    }


}
