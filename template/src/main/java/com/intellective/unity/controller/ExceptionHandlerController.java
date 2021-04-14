package com.intellective.unity.controller;

import com.intellective.commons.error.CryptoConfigurationError;
import com.netflix.zuul.exception.ZuulException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.ClientAuthorizationRequiredException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class ExceptionHandlerController {
    private static final Logger logger = LoggerFactory.getLogger(ExceptionHandlerController.class);


    @ExceptionHandler(Throwable.class)
    @ResponseBody
    public ResponseEntity<?> handleError(Throwable rawException) {
        errorTrace(rawException);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rawException.getMessage());
    }

    @ExceptionHandler(CryptoConfigurationError.class)
    @ResponseBody
    public ResponseEntity<?> handleError(Exception e) {
        errorTrace(e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(("Shared link is broken. " + e.getMessage()));
    }

    @ExceptionHandler(ClientAuthorizationRequiredException.class)
    @ResponseBody
    public ResponseEntity<?> handleError(ClientAuthorizationRequiredException rawException) {
        errorTrace(rawException);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(rawException.getMessage());
    }

    @ExceptionHandler(ZuulException.class)
    @ResponseBody
    public ResponseEntity<?> handleError(ZuulException rawException) {
        if (rawException.getCause() instanceof ClientAuthorizationRequiredException) {
            return handleError((ClientAuthorizationRequiredException) rawException.getCause());
        }
        errorTrace(rawException);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rawException.getMessage());
    }


    private void errorTrace(Throwable e) {
        logger.error("Unable execute request due to {}.", e.getClass().getSimpleName(), e);
    }
}