package com.example.demo.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.service.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    /*
    JWT 방식은 세션방식과 다르게 Filter 하나를 추가해줘야합니다.

    이제 사용자가 로그인을 했을 때, Request에 가지고 있는 Token을 해석해주는 로직이 필요하기 때문입니다.

    이 역할을 하는 것이 JWTAuthenticatonFilter.

    세부 비즈니스 로직들은 전부 JwtTokenProvider에 적어줍니다. 일종의 Service 클래스라고 생각하면 됩니다.

     */

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        // 헤더에서 JWT 를 받아옵니다.
        String accessToken = jwtTokenProvider.resolveToken(request);
        String refreshToken = jwtTokenProvider.resolveRefreshToken(request);

        // accessToken이 있는지
        if (accessToken != null && jwtTokenProvider.validateToken(accessToken, request)) {
            // 토큰 인증과정을 거친 결과를 authentication이라는 이름으로 저장해줌.
            Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
            // SecurityContext 에 Authentication 객체를 저장합니다.
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        //UsernamePasswordAuthenticationFilter로 이동
        chain.doFilter(request, response);
    }

    // @Override
    // protected void doFilterInternal(HttpServletRequest request, HttpServletRequest response, FilterChain chain) throws IOException, ServletException {
    //     // 1. 헤더에서 JWT 를 받아옵니다.
    //     String accessToken = jwtTokenProvider.resolveToken(request);
    //     String refreshToken = jwtTokenProvider.resolveRefreshToken(request);

    //     // 2. 유효한 토큰인지 확인합니다. 유효성검사
    //     if (accessToken != null && jwtTokenProvider.validateToken(accessToken, request)) {
    //         // 3. 토큰 인증과정을 거친 결과를 authentication이라는 이름으로 저장해줌.
    //         Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
    //         // 4. SecurityContext 에 Authentication 객체를 저장합니다.
    //         // token이 인증된 상태를 유지하도록 context(맥락)을 유지해줌
    //         SecurityContextHolder.getContext().setAuthentication(authentication);
    //     }
    //     //5. UsernamePasswordAuthenticationFilter로 이동
    //     chain.doFilter(request, response);
    // }
}
