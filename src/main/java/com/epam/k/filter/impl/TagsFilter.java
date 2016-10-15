package com.epam.k.filter.impl;

import com.epam.k.domain.QVacation;
import com.epam.k.domain.Tag;
import com.epam.k.filter.Filter;
import com.epam.k.web.dto.FilterDTO;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.apache.commons.collections4.CollectionUtils;

import java.util.List;

public class TagsFilter implements Filter {
    @Override
    public BooleanExpression addConstraint(BooleanExpression filterExpression, FilterDTO filter) {
        List<Tag> filterTags = filter.getTags();
        if (!CollectionUtils.isEmpty(filterTags)) {
            QVacation qVacation = QVacation.vacation;
            BooleanExpression[] tagsContained = filterTags.stream()
                    .map(tag -> qVacation.tags.contains(tag))
                    .toArray(BooleanExpression[]::new);
            return filterExpression.andAnyOf(tagsContained);
        }
        return filterExpression;
    }
}
