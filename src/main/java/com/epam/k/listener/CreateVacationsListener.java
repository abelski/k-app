package com.epam.k.listener;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import com.mongodb.client.MongoDatabase;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.bson.BsonDocument;
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

    @Value("${vacations.list}")
    private String vacationsPath;

    @Value("${uploadDir}")
    private String uploadDir;

    @Value("${resourceImgDir}")
    private String resourceImgDir;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        try {
            createUploadDir();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try (InputStream vacationsStream = getClass().getClassLoader().getResourceAsStream(vacationsPath)) {
            String vacationsJson = IOUtils.toString(vacationsStream);
            ObjectMapper objectMapper = new ObjectMapper();
            List<Vacation> vacations = objectMapper.readValue(vacationsJson, new TypeReference<List<Vacation>>(){});
            vacationDAO.save(vacations);
        } catch (IOException e) {
            LOGGER.warn("Error in the vacations creation", e);
        }
    }

    private void createUploadDir() throws IOException {
        File uploadFolder = new File(uploadDir);
        if (!uploadFolder.exists()) {
            uploadFolder.mkdirs();
        }

        File resourceImgsFolder = context.getResource("classpath:img").getFile();
        if (resourceImgsFolder.exists()) {
            FileUtils.copyDirectory(resourceImgsFolder, uploadFolder);
        }
    }
}

