package com.example.demo.config;

import com.example.demo.entity.Expense;
import com.example.demo.entity.Goal;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {
    private String theAllowedOrigins = "https://finance-app-frontend-production-7ab9.up.railway.app";
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {HttpMethod.PATCH};
        config.exposeIdsFor(Expense.class);
        config.exposeIdsFor(Goal.class);
        // disable HTTP methods
        disableHttpMethods(Expense.class, config, theUnsupportedActions);
        disableHttpMethods(Goal.class, config, theUnsupportedActions);

//        Configure CORS Mapping
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(theAllowedOrigins, "http://localhost:3000").allowedMethods("GET", "POST", "DELETE", "PUT", "OPTIONS");
    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }
}
