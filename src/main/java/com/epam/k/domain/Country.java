package com.epam.k.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Country {
    @Id
    private String id;
    private String name;

    public String getId() {
        return id;
    }

    public Country setId(String id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Country setName(String name) {
        this.name = name;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Country country = (Country) o;

        if (id != null ? !id.equals(country.id) : country.id != null) return false;
        return name != null ? name.equals(country.name) : country.name == null;

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }
}
