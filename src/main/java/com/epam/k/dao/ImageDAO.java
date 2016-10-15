package com.epam.k.dao;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.epam.k.domain.Image;


/**
 * Created by Ruslan_Mostov on 10/15/2016.
 */
public interface ImageDAO extends PagingAndSortingRepository<Image, String>, QueryDslPredicateExecutor<Image>
{

}
