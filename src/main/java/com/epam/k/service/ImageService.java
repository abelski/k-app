package com.epam.k.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;

import com.epam.k.dao.ImageDAO;
import com.epam.k.domain.Image;


/**
 * Created by Ruslan_Mostov on 10/15/2016.
 */
public class ImageService extends BaseService<Image, String>
{
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
