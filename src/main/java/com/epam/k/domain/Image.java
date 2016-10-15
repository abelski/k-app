package com.epam.k.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.net.URL;

@Document
public class Image {
    @Id
    private String id;
    private URL url;
    private String altText;
    private String ext;

    public String getId() {
        return id;
    }

    public Image setId(String id) {
        this.id = id;
        return this;
    }

    public URL getUrl() {
        return url;
    }

    public Image setUrl(URL url) {
        this.url = url;
        return this;
    }

    public String getAltText() {
        return altText;
    }

    public Image setAltText(String altText) {
        this.altText = altText;
        return this;
    }

    public String getExt() {
        return ext;
    }

    public Image setExt(String ext) {
        this.ext = ext;
        return this;
    }
}
