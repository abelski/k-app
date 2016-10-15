package com.epam.k.filter.impl;

import com.epam.k.domain.QVacation;
import com.epam.k.domain.Transport;
import com.epam.k.filter.Filter;
import com.epam.k.web.dto.FilterDTO;
import com.querydsl.core.types.dsl.BooleanExpression;

public class TransportFilter implements Filter {
    @Override
    public BooleanExpression addConstraint(BooleanExpression filterExpression, FilterDTO filter) {
        Transport transport = filter.getTransport();
        if (transport != null) {
            QVacation vacation = QVacation.vacation;
            return filterExpression.and(vacation.transport.eq(transport));
        }
        return filterExpression;
    }
}
