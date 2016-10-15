package com.epam.k.configuration;

import com.epam.k.filter.VacationFilterPredicateBuilder;
import com.epam.k.filter.impl.*;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.Arrays;

@Configuration
@EnableMongoRepositories(basePackages = {"com.epam.k.dao"})
public class PersistenceConfiguration {

    @Value("${mongodb.name}")
    private String mongoDb;

    @Bean
    public MongoDatabase database(MongoClient client) {
        return client.getDatabase(mongoDb);
    }

    @Bean
    public VacationFilterPredicateBuilder vacationFilterPredicateBuilder() {
        VacationFilterPredicateBuilderImpl builder = new VacationFilterPredicateBuilderImpl();
        builder.setFilters(Arrays.asList(new DatesFilter(), new OwnerIdFilter(), new TagsFilter(), new TransportFilter()));
        return builder;
    }
}
