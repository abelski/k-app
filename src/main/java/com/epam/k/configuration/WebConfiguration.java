package com.epam.k.configuration;

import javax.servlet.Filter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.epam.k.web.filter.SpyFilter;


@Configuration
public class WebConfiguration extends WebMvcConfigurerAdapter {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }

    @Bean
    public JavaMailSenderImpl configureAndReturnSender() {
        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        sender.setHost("smtp.gmail.com");
        sender.setUsername("hackathonhere@gmail.com");
        sender.setPassword("hackathon");
        sender.setPort(587);
        sender.getJavaMailProperties().setProperty("mail.mime.charset", "UTF-8");
        sender.getJavaMailProperties().setProperty("mail.smtp.starttls.enable", "true");
        return sender;
    }

    @Bean("spyFilter")
    public Filter spyFilter() {
        return new SpyFilter();
    }
}
