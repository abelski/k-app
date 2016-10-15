package com.epam.k.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;

import com.epam.k.dao.VacationDAO;
import com.epam.k.domain.User;
import com.epam.k.domain.Vacation;
import com.epam.k.domain.enums.VacationStatus;


/**
 * Created by Ruslan_Mostov on 10/15/2016.
 */
public class VacationService extends BaseService<Vacation, String>
{
   @Autowired
   private VacationDAO vacationDAO;

   @Override
   public VacationDAO getRepository()
   {
      return vacationDAO;
   }

   @Override
   public QueryDslPredicateExecutor<Vacation> getQueryDSLPredicateExecutor()
   {
      return vacationDAO;
   }

   public Iterable<Vacation> findAllByOwner(final User user)
   {
      final List<Vacation> vacationsOwnedByUser = getRepository().findAllByOwnerAndStatusIn(user, Arrays.asList
            (VacationStatus.OPEN, VacationStatus.CLOSED));
      return vacationsOwnedByUser;
   }
}
