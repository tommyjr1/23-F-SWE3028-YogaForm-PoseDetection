package com.example.demo.exception;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

// @Slf4j
// @RestControllerAdvice
// public class CustomExceptionHandler {
//     // @ExceptionHandler(value = {CustomException.class})
//     // public ResponseEntity<Object> handleAdminErrorException(CustomException exception) {
//     //     log.error("throw customException : {}", exception.getErrorCode());
//     //     ErrorResponseDto restApiException = new ErrorResponseDto(HttpStatus.valueOf(exception.getErrorCode().getHttpStatus()), exception.getErrorCode().getDetail(), "");
//     //     return new ResponseEntity<>(restApiException, HttpStatus.valueOf(exception.getErrorCode().getHttpStatus()));
//     // }
// }

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(CustomException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public void handleAdminErrorException(HttpServletResponse response) throws IOException {
        // 예외가 발생할 때 클라이언트에게 리다이렉션 대신 특정 정보를 전송
        response.getWriter().write("Custom RuntimeException occurred!");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }
}