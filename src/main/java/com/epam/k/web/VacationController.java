package com.epam.k.web;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.epam.k.domain.Activity;
import com.epam.k.domain.Comment;
import com.epam.k.domain.User;
import com.epam.k.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.epam.k.domain.Vacation;
import com.epam.k.filter.VacationFilterPredicateBuilder;
import com.epam.k.service.VacationService;
import com.epam.k.web.dto.FilterDTO;
import com.querydsl.core.types.dsl.BooleanExpression;


@RestController
public class VacationController {

    @Autowired
    private VacationService vacationService;

    @Autowired
    private UserService userService;
    
    @Autowired
    private VacationFilterPredicateBuilder vacationFilterPredicateBuilder;

    @RequestMapping(value = "/vacations", method = GET)
    public HttpEntity<Iterable<Vacation>> list() {
        return new HttpEntity<>(vacationService.findAll());
    }

    @RequestMapping(value = "/filtered-vacations", method = POST)
    public HttpEntity<Iterable<Vacation>> findAllFiltered(@RequestBody final FilterDTO filter) {
        final BooleanExpression filterExpression = vacationFilterPredicateBuilder.getFilterExpressionForFilter(filter);
        return new HttpEntity<>(vacationService.findAll(filterExpression));
    }

    @RequestMapping(value = "/vacation", method = POST)
    public HttpEntity<Vacation> saveVacation(@RequestBody final Vacation vacation) {
        return new HttpEntity<>(vacationService.save(vacation));
    }

    @RequestMapping(value = "/vacations", method = POST)
    public HttpEntity<List<String>> saveVacations(@RequestBody final List<Vacation> vacations) {
        final Iterable<Vacation> savedVacs = vacationService.save(vacations);
        final List<String> vacIds = StreamSupport.stream(savedVacs.spliterator(), false)
                .map(vac -> vac.getId())
                .collect(Collectors.toList());
        return new HttpEntity<>(vacIds);
    }

    @RequestMapping(value = "/vacations/{id}", method = GET)
    public HttpEntity<Vacation> find(@PathVariable("id") final String id) {
        return new HttpEntity<>(vacationService.findOne(id));
    }

    @RequestMapping(value = "/vacations/{vacId}/user/{userId}", method = POST)
    public HttpEntity<Vacation> addUserToVacation(@PathVariable("vacId") final String vacId,
                                                  @PathVariable("userId") final String userId) {
        final User user = userService.findOne(userId);
        final Vacation vacation = vacationService.findOne(vacId);
        vacation.getMembers().add(user);
        return new HttpEntity<>(vacationService.save(vacation));
    }

    @RequestMapping(value = "/vacations/{id}/comments", method = GET)
    public HttpEntity<Iterable<Comment>> getCommentsByVacationsId(@PathVariable final String id) {
        return new HttpEntity<>(vacationService.findOne(id).getComments());
    }

    @RequestMapping(value = "/vacations/{id}/comment", method = POST)
    public HttpEntity<Vacation> addCommentToVacation(@PathVariable final String id, @RequestBody Comment comment) {
        Vacation vacation = vacationService.findOne(id);
        vacation.getComments().add(comment);
        return new HttpEntity<>(vacationService.save(vacation));
    }

    @RequestMapping(value = "/vacations/{id}/activity", method = GET)
    public HttpEntity<Iterable<Activity>> getActivityByVacationId(@PathVariable final String id) {
        return new HttpEntity<>(vacationService.findOne(id).getPlannedActivities());
    }

    @RequestMapping(value ="/vacations/{id}/activity", method = POST)
    public HttpEntity<Vacation> addActivityToVacation(@PathVariable("id") final String id, @RequestBody final Activity activity) {
        Vacation vacation = vacationService.findOne(id);
        vacation.getPlannedActivities().add(activity);
        return new HttpEntity<>(vacationService.save(vacation));
    }
}
