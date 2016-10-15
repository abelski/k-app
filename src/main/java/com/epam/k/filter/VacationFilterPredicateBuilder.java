package com.epam.k.filter;

import com.epam.k.web.dto.FilterDTO;
import com.querydsl.core.types.dsl.BooleanExpression;

public interface VacationFilterPredicateBuilder {

    BooleanExpression getFilterExpressionForFilter(final FilterDTO filter);
}
