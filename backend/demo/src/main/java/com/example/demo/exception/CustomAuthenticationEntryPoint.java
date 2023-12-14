package com.example.demo.exception;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;


@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        System.out.println("CustomAuthentication: "+request.getAttribute("exception"));
        
        ErrorCode exception = (ErrorCode) request.getAttribute("exception");
        System.out.println("exception = " + exception);
        if (exception == null) {
            // response.sendRedirect("/yf/exception/entrypoint");
            request.getRequestDispatcher("/yf/exception/entrypoint").forward(request, response);
        }else if (exception.equals(ErrorCode.TOKEN_EXPIRED)) {
            // response.setStatus(ErrorCode.TOKEN_EXPIRED.getHttpStatus());
            // response.setHeader("msg", ErrorCode.TOKEN_EXPIRED.getDetail());
            // response.sendRedirect("/yf/exception/tokenexpire");
            request.getRequestDispatcher("/yf/exception/tokenexpire").forward(request, response);

        }
    }
}