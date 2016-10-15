package com.epam.k.filter.impl;

import com.epam.k.domain.Place;
import com.epam.k.domain.QVacation;
import com.epam.k.filter.Filter;
import com.epam.k.web.dto.FilterDTO;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.apache.commons.collections4.CollectionUtils;

import java.util.List;

public class PlacesFilter implements Filter {
    @Override
    public BooleanExpression addConstraint(BooleanExpression filterExpression, FilterDTO filter) {
        List<Place> places = filter.getPlaces();
        if (!CollectionUtils.isEmpty(places)) {
            QVacation vacation = QVacation.vacation;
            BooleanExpression[] placesFilters = places.stream()
                    .map(place -> vacation.places.contains(place))
                    .toArray(BooleanExpression[]::new);
            return filterExpression.andAnyOf(placesFilters);
        }
        return filterExpression;
    }
}
