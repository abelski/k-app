package com.epam.k.web;

import com.epam.k.domain.User;
import com.epam.k.domain.enums.Role;
import com.epam.k.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public void register(@RequestParam String username, @RequestParam String password) {
        if (userService.findByUsername(username) != null) {
            return;
        }
        final User user = new User();
        user.setUsername(username);
        userService.setEncodedPassword(user, password);
        userService.addAuthority(user, Role.ROLE_USER);
        userService.save(user);
    }
}
