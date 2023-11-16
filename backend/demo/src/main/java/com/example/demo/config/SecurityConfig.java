package com.example.demo.config;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.headers(withDefaults())
                .csrf(csrf -> csrf.disable());
                // .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
            // .and();

    }
    

}
