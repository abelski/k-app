package com.epam.k.filter.impl;

import com.epam.k.domain.QVacation;
import com.epam.k.filter.Filter;
import com.epam.k.web.dto.FilterDTO;
import com.querydsl.core.types.dsl.BooleanExpression;

public class OwnerFilter implements Filter {
    @Override
    public BooleanExpression addConstraint(BooleanExpression filterExpression, FilterDTO filter) {
        String ownerId = filter.getOwnerId();
        if (ownerId != null) {
            QVacation vacation = QVacation.vacation;
            return filterExpression.and(vacation.owner.id.eq(ownerId));
        }
        return filterExpression;
    }
}
