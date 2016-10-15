package com.epam.k.service;

/**
 * Created by Ruslan_Mostov on 10/15/2016.
 */
import java.io.Serializable;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.querydsl.core.types.Predicate;

public abstract class BaseService<T, ID extends Serializable>
{

   public abstract PagingAndSortingRepository<T, ID> getRepository();

   public abstract QueryDslPredicateExecutor<T> getQueryDSLPredicateExecutor();

   public Iterable<T> findAll(Sort sort)
   {
      return getRepository().findAll(sort);
   }

   public Page<T> findAll(Pageable pageable)
   {
      return getRepository().findAll(pageable);
   }

   public T save(T entity)
   {
      return getRepository().save(entity);
   }

   public Iterable<T> save(Iterable<T> entities)
   {
      return getRepository().save(entities);
   }

   public T findOne(ID id)
   {
      return getRepository().findOne(id);
   }

   public boolean exists(ID id)
   {
      return getRepository().exists(id);
   }

   public Iterable<T> findAll()
   {
      return getRepository().findAll();
   }

   public Iterable<T> findAll(Iterable<ID> ids)
   {
      return getRepository().findAll(ids);
   }

   public Iterable<T> findAll(Predicate predicate)
   {
      return getQueryDSLPredicateExecutor().findAll(predicate);
   }

   public long count()
   {
      return getRepository().count();
   }

   public void delete(ID id)
   {
      getRepository().delete(id);
   }

   public void delete(T entity)
   {
      getRepository().delete(entity);
   }

   public void delete(Iterable<T> entities)
   {
      getRepository().delete(entities);
   }

   public void deleteAll()
   {
      getRepository().deleteAll();
   }

}
