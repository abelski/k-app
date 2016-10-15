package com.epam.k.listener;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import com.epam.k.dao.ImageDAO;
import com.epam.k.dao.UserDAO;
import com.epam.k.domain.Comment;
import com.epam.k.domain.Image;
import com.epam.k.domain.User;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.epam.k.dao.VacationDAO;
import com.epam.k.domain.Vacation;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class CreateVacationsListener implements ApplicationListener<ContextRefreshedEvent> {
    private static final Logger LOGGER = Logger.getLogger(CreateVacationsListener.class);

    @Autowired
    private ApplicationContext context;

    @Autowired
    private VacationDAO vacationDAO;

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private ImageDAO imageDAO;

    @Value("${vacations.list}")
    private String vacationsPath;

    @Value("${uploadDir}")
    private String uploadDir;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        try (InputStream vacationsStream = getClass().getClassLoader().getResourceAsStream(vacationsPath)) {
            String vacationsJson = IOUtils.toString(vacationsStream);
            ObjectMapper objectMapper = new ObjectMapper();
            List<Vacation> vacations = objectMapper.readValue(vacationsJson, new TypeReference<List<Vacation>>(){});

            vacations.stream().forEach(vacation -> {
                userDAO.save(vacation.getOwner());
                for (User member :vacation.getMembers()) {
                    userDAO.save(member);
                }
                imageDAO.save(vacation.getTitleImg());
                for (Image image : vacation.getGallery()) {
                    imageDAO.save(image);
                }

                for (Comment comment : vacation.getComments()) {
                    userDAO.save(comment.getAuthor());
                }
            });

            vacationDAO.save(vacations);
        } catch (IOException e) {
            LOGGER.warn("Error in the vacations creation", e);
        }
    }
}

