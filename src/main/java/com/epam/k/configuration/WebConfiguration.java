package com.epam.k.configuration;

import com.epam.k.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.util.WebUtils;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Configuration
public class WebConfiguration extends WebMvcConfigurerAdapter {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }

    @Bean
    public Filter tokenFilter(UserService userService) {
        return new Filter() {
            @Override
            public void init(FilterConfig filterConfig) throws ServletException {

            }

            @Override
            public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
                Cookie stkn = WebUtils.getCookie((HttpServletRequest) request, "STKN");
                if (stkn != null) {
                    ((HttpServletRequest) request).getSession().setAttribute("user", userService.findByToken(stkn.getValue()));
                }
            }

            @Override
            public void destroy() {

            }
        };
    }
}
