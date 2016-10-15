package com.epam.k.dao;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.epam.k.domain.User;


/**
 * Created by Ruslan_Mostov on 10/15/2016.
 */
public interface UserDAO extends PagingAndSortingRepository<User, String>, QueryDslPredicateExecutor<User>
{
   User findByUsername(String username);

   User findByToken(String token);
}
