FROM maven:3.8.7-jdk-17-eclipse-temurin AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src/ .

RUN mvn clean package

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
