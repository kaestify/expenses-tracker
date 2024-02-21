package com.example.demo.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.util.List;

@EnableWebSecurity
@Configuration
public class SecurityConfiguration {


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Disable cross site request forgery
        http
                .csrf(csrf -> csrf.disable())

                .cors(cors -> {
                    cors.configurationSource(corsConfigurationSource());
                }

                )

                // Protect endpoints at /api/<type>/secure
//                .authorizeHttpRequests(auth -> auth
//                                .requestMatchers("/api/expenses/**").authenticated()
//                                .requestMatchers("/api/goals/**").authenticated()
//                )

                .authorizeHttpRequests((auth) -> auth
                        .anyRequest()
                        .authenticated()
                )
                .oauth2ResourceServer((oauth2) -> oauth2
                        .jwt(Customizer.withDefaults())
                )

                // Add content negotiation strategy
                .setSharedObject(ContentNegotiationStrategy.class,
                        new HeaderContentNegotiationStrategy());

        // Force a non-empty response body for 401's to make the response friendly
        // seems to be some issue w this
        // currently getting blank response for ${process.env.REACT_APP_API}/books/secure/checkout?bookId=1 in postman
        Okta.configureResourceServer401ResponseBody(http);


        return http.build(); //security config is using build design pattern
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.setAllowedOrigins(List.of("https://finance-app-frontend-production-7ab9.up.railway.app", "http://localhost:3000"));
//        configuration.addAllowedMethod("*");
        configuration.setAllowedMethods(List.of("GET","POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
//        configuration.addAllowedHeader("*");
        configuration.setExposedHeaders(List.of("Authorization", "Cache-Control", "Content-Type", "Access-Control-Allow-Origin"));
        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type", "Access-Control-Allow-Origin"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new
                UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


}