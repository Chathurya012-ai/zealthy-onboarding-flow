# === STAGE 1: Build the JAR ===
FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

# === STAGE 2: Run the Spring Boot App ===
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/onboarding-1.0.0.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
