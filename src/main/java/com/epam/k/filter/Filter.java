package com.epam.k.filter;

import com.epam.k.web.dto.FilterDTO;
import com.querydsl.core.types.dsl.BooleanExpression;

public interface Filter {
    BooleanExpression addConstraint(final BooleanExpression filterExpression, final FilterDTO filter);
}
