package com.epam.k.filter.impl;

import com.epam.k.domain.QVacation;
import com.epam.k.filter.Filter;
import com.epam.k.web.dto.FilterDTO;
import com.querydsl.core.types.dsl.BooleanExpression;

import java.time.LocalDate;

public class DatesFilter implements Filter {
    @Override
    public BooleanExpression addConstraint(BooleanExpression filterExpression, FilterDTO filter) {
        LocalDate startDate = filter.getStartDate();
        LocalDate endDate = filter.getEndDate();
        QVacation vacation = QVacation.vacation;
        if (startDate != null && endDate == null) {
            return filterExpression.and(vacation.beginDate.eq(startDate).or(vacation.beginDate.after(startDate)));
        }
        if (endDate != null && startDate == null) {
            return filterExpression.and(vacation.endDate.eq(endDate).or(vacation.endDate.before(endDate)));
        }
        if (startDate != null && endDate != null) {
            return filterExpression
                    .and(vacation.beginDate.eq(startDate).or(vacation.beginDate.after(startDate)))
                    .and(vacation.endDate.eq(endDate).or(vacation.endDate.before(endDate)));
        }
        return filterExpression;
    }
}
