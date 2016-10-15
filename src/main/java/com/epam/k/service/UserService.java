package com.epam.k.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;

import com.epam.k.dao.UserDAO;
import com.epam.k.domain.User;


/**
 * Created by Ruslan_Mostov on 10/15/2016.
 */
public class UserService extends BaseService<User, String>
{
   private final static Logger LOG = LoggerFactory.getLogger(UserService.class);

   @Autowired
   private UserDAO userDAO;

   @Override
   public UserDAO getRepository() {
      return userDAO;
   }

   @Override
   public QueryDslPredicateExecutor<User> getQueryDSLPredicateExecutor() {
      return userDAO;
   }

   public User findByUsername(final String username) {
      LOG.debug("Requesting user '{}' from DB", username);
      if (username == null) {
         return null;
      }
      return getRepository().findByUsername(username);
   }

   public User findByToken(String token) {
      return getRepository().findByToken(token);
   }
}
