package com.example.tasklist.config;

import com.example.tasklist.entity.Task;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class TaskListDataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        cors.addMapping("/**").allowedOrigins("*");
        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Task.class);
    }
}
