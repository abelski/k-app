package com.epam.k.filter.impl;

import com.epam.k.domain.QVacation;
import com.epam.k.filter.Filter;
import com.epam.k.web.dto.FilterDTO;
import com.querydsl.core.types.dsl.BooleanExpression;

public class DepartureCountryFilter implements Filter {
    @Override
    public BooleanExpression addConstraint(BooleanExpression filterExpression, FilterDTO filter) {
        String departureCountry = filter.getDepartureCountry();
        if (departureCountry != null) {
            QVacation vacation = QVacation.vacation;
            return filterExpression.and(vacation.departureCountry.eq(departureCountry));

        }
        return filterExpression;
    }
}
