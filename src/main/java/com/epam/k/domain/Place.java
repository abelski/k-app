package com.epam.k.domain;

public class Place {
    private Country country;
    private City city;

    public Country getCountry() {
        return country;
    }

    public Place setCountry(Country country) {
        this.country = country;
        return this;
    }

    public City getCity() {
        return city;
    }

    public Place setCity(City city) {
        this.city = city;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Place place = (Place) o;

        if (country != null ? !country.equals(place.country) : place.country != null) return false;
        return city != null ? city.equals(place.city) : place.city == null;

    }

    @Override
    public int hashCode() {
        int result = country != null ? country.hashCode() : 0;
        result = 31 * result + (city != null ? city.hashCode() : 0);
        return result;
    }
}
