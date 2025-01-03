# First stage: Build using Maven
FROM maven:3.8.7-openjdk-17-slim
WORKDIR /app
COPY . .  # Copy the entire project into /app
RUN mvn clean install  # Run Maven build

# Second stage: Use OpenJDK
FROM openjdk:17-jdk-slim
COPY --from=build /app/target /app/target
CMD ["java", "-jar", "/app/target/myapp.jar"]
