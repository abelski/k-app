package com.epam.k.service;

import com.epam.k.dao.ImageDAO;
import com.epam.k.domain.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Service;

@Service
public class ImageService extends BaseService<Image, String> {
    @Autowired
    private ImageDAO imageDAO;

    @Override
    public ImageDAO getRepository() {
        return imageDAO;
    }

    @Override
    public QueryDslPredicateExecutor<Image> getQueryDSLPredicateExecutor() {
        return imageDAO;
    }
}
