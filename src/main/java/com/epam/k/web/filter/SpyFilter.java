package com.epam.k.web.filter;

import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Created by Maksim Ruts on 10/15/2016.
 */
public class SpyFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String req = httpServletRequest.getRequestURI();
        String query = httpServletRequest.getQueryString();
        if (Objects.nonNull(query)) {
            req += "?" + query;
        }
        System.out.println(LocalDateTime.now().toString() + " request to: " + req);
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}