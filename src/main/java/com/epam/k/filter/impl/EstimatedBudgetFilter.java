package com.epam.k.filter.impl;

import com.epam.k.domain.QVacation;
import com.epam.k.filter.Filter;
import com.epam.k.web.dto.FilterDTO;
import com.querydsl.core.types.dsl.BooleanExpression;

import java.math.BigDecimal;

public class EstimatedBudgetFilter implements Filter {
    @Override
    public BooleanExpression addConstraint(BooleanExpression filterExpression, FilterDTO filter) {
        BigDecimal estimatedCost = filter.getEstimatedCost();
        if (estimatedCost != null) {
            QVacation vacation = QVacation.vacation;
            return filterExpression.and(vacation.estimatedCost.eq(estimatedCost)
                    .or(vacation.estimatedCost.lt(estimatedCost)));
        }
        return filterExpression;
    }
}
