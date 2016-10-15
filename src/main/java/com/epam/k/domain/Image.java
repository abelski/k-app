package com.epam.k.domain;

import org.springframework.data.mongodb.core.mapping.Document;

import java.net.URI;

@Document
public class Image {
    private String id;
    private String altText;
    private String extension;
    private URI uri;
    private String description;

    public String getId() {
        return id;
    }

    public Image setId(final String id) {
        this.id = id;
        return this;
    }

    public String getAltText() {
        return altText;
    }

    public Image setAltText(final String altText) {
        this.altText = altText;
        return this;
    }

    public String getExtension() {
        return extension;
    }

    public Image setExtension(final String extension) {
        this.extension = extension;
        return this;
    }

    public URI getUri() {
        return uri;
    }

    public Image setUri(final URI uri) {
        this.uri = uri;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Image setDescription(final String description) {
        this.description = description;
        return this;
    }
}
