# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Stage 1 — build your JAR with Maven
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FROM maven:3.8.6-openjdk-17-slim AS build

WORKDIR /app

# copy in just the POM so we can cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# now copy the rest of the source and package
COPY src ./src
RUN mvn clean package -DskipTests -B

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Stage 2 — run it on a minimal JRE
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# grab the fat JAR from the 'build' stage
COPY --from=build /app/target/onboarding-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
