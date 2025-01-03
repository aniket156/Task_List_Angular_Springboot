# Start with a base image that has Java installed
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Spring Boot application JAR file into the container
COPY ../target/Task-List-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your application runs on
EXPOSE 8080

# Command to run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
