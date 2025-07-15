FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# copy the built jar
COPY --from=build /app/target/onboarding-1.0.0.jar app.jar

# expose the port your Spring Boot app listens on
EXPOSE 8080

# tell Docker how to start it
ENTRYPOINT ["java", "-jar", "app.jar"]
