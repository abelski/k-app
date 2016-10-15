package com.epam.k.web;

import com.epam.k.domain.User;
import com.epam.k.domain.Vacation;
import com.epam.k.service.UserService;
import com.epam.k.service.VacationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class UserController {

   @Autowired
   private UserService userService;

   @Autowired
   private VacationService vacationService;

   @RequestMapping(value = "/user/{id}", method = GET)
   public HttpEntity<User> find(@PathVariable("id") final String id) {
      return new HttpEntity<>(userService.findOne(id));
   }

   @RequestMapping(value ="/users", method = GET)
   public HttpEntity<Iterable<User>> list() {
      return new HttpEntity<>(userService.findAll());
   }

   @RequestMapping(value = "/user/{id}/vacations", method = GET)
   public HttpEntity<Iterable<Vacation>> getVacationsByUserId(@PathVariable("id") final String userId) {
      User user = userService.findOne(userId);
      Iterable<Vacation> vacations = vacationService.findAllByOwner(user);
      return new HttpEntity<>(vacations);
   }
}
