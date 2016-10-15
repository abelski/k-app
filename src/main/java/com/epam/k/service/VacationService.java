package com.epam.k.service;

import com.epam.k.dao.VacationDAO;
import com.epam.k.domain.User;
import com.epam.k.domain.Vacation;
import com.epam.k.domain.enums.VacationStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class VacationService extends BaseService<Vacation, String> {
    @Autowired
    private VacationDAO vacationDAO;

    @Override
    public VacationDAO getRepository() {
        return vacationDAO;
    }

    @Override
    public QueryDslPredicateExecutor<Vacation> getQueryDSLPredicateExecutor() {
        return vacationDAO;
    }

    public Iterable<Vacation> findAllByOwner(final User user) {
        return getRepository().findAllByOwnerAndStatusIn(user, Arrays.asList (VacationStatus.OPEN, VacationStatus.CLOSED));
    }
}
