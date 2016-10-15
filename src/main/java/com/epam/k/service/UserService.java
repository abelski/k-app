package com.epam.k.service;

import com.epam.k.dao.UserDAO;
import com.epam.k.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService extends BaseService<User, String> {
    private final static Logger LOG = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

    public void setEncodedPassword(final User user, final String password) {
        user.setPassword(passwordEncoder.encode(password));
    }

    public void updateUserPassword(final User user, final String password) {
        user.setPassword(passwordEncoder.encode(password));
        save(user);
    }
}
