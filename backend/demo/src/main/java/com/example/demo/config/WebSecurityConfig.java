package com.example.demo.config;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.exception.CustomAccessDeniedHandler;
import com.example.demo.exception.CustomAuthenticationEntryPoint;
import com.example.demo.service.JwtTokenProvider;

import lombok.RequiredArgsConstructor;


/* Security Config2(Jwt Token Login에서 사용)와 같이 사용하면 에러 발생
Security Form Login 진행하기 위해서는 이 부분 주석 제거 후 Security Config2에 주석 추가*/
@Configuration
@EnableWebSecurity
// 다른 인증, 인가 방식 적용을 위한 어노테이션
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor

public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

        // @Autowired
        // JwtTokenProvider jwtTokenProvider;

        private final JwtTokenProvider jwtTokenProvider;



        @Bean
        public BCryptPasswordEncoder encoderPassword() {
                return new BCryptPasswordEncoder();
        }

        // 정적 자원에 대해서는 Security 설정을 적용하지 않음.
        @Override
        public void configure(WebSecurity web) {
                web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
        }


        @Override
        protected void configure(HttpSecurity http) throws Exception {
                //스프링시큐리티에서 만들어주는 로그인 페이지를 안쓰기 위해
                http.httpBasic().disable();

                //세선사용 x
                //JWT 토큰 방식을 사용하면 더이상 세션저장은 필요없으니 해당 기능 끔
                http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

                //프론트엔드가 별도로 존재하여 rest Api로 구성
                http.csrf().disable();
                http.cors().configurationSource(corsConfigurationSource())
                        .and()
                        .headers().cacheControl().disable();
                http.authorizeRequests()
                        .antMatchers("/secure/**").authenticated()
                        .anyRequest().permitAll();
                
                 //JwtFilter 추가
                http.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);

                
                //토큰 인증과정에서 발생하는 예외를 처리하기 위한 EntryPoint를 등록하는 것.
                http.exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint());

                //인가(일반사용자가 관리자 페이지 접근과 같은 경우) 실패 시 리다이렉트 되는 것.
                http.exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler());
        };

        @Bean
        public CorsConfigurationSource corsConfigurationSource(){
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.addAllowedOrigin("*");
                configuration.addAllowedHeader("*");
                configuration.addAllowedMethod("*");
                configuration.addExposedHeader("*"); // 모든걸 허용함 

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
    }
}