package com.intellective.unity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication(scanBasePackages = {"com.intellective.unity"})
@EnableZuulProxy
public class UnityApplication {
	private final static Logger logger = LoggerFactory.getLogger(UnityApplication.class);

	public static void main(String... args) {
		ConfigurableApplicationContext context = SpringApplication.run(UnityApplication.class, args);
	}
}

