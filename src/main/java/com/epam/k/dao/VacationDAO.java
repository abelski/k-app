package com.epam.k.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.epam.k.domain.User;
import com.epam.k.domain.Vacation;
import com.epam.k.domain.enums.VacationStatus;


/**
 * Created by Ruslan_Mostov on 10/15/2016.
 */
public interface VacationDAO extends PagingAndSortingRepository<Vacation, String>, QueryDslPredicateExecutor<Vacation>
{
   List<Vacation> findAllByOwnerAndStatusIn(User user, List<VacationStatus> vacationStatuses);

   List<Vacation> findAllByMembersContainingAndStatusIn(User user, List<VacationStatus> vacationStatuses);
}
