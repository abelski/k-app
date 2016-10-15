package com.epam.k.filter.impl;

import com.epam.k.domain.QVacation;
import com.epam.k.filter.Filter;
import com.epam.k.filter.VacationFilterPredicateBuilder;
import com.epam.k.web.dto.FilterDTO;
import com.querydsl.core.types.dsl.BooleanExpression;

import java.util.List;

public class VacationFilterPredicateBuilderImpl implements VacationFilterPredicateBuilder {

    private List<Filter> filters;

    @Override
    public BooleanExpression getFilterExpressionForFilter(FilterDTO filterDTO) {
        BooleanExpression constraint = QVacation.vacation.id.isNotNull();
        for (Filter filter : filters) {
            constraint = filter.addConstraint(constraint, filterDTO);
        }
        return constraint;
    }

    public List<Filter> getFilters() {
        return filters;
    }

    public VacationFilterPredicateBuilderImpl setFilters(List<Filter> filters) {
        this.filters = filters;
        return this;
    }
}
