# First stage: Build using Maven
FROM maven:3.8.7 as build
WORKDIR /app
COPY . .
RUN mvn clean install

# Second stage: Use OpenJDK
FROM openjdk:17-jdk-slim
COPY --from=build /app/target /app/target
CMD ["java", "-jar", "/app/target/Task-List-0.0.1-SNAPSHOT.jar"]
