# Use a valid Maven image
FROM maven:3.8.7-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy source files
COPY . .

# Build the application
RUN mvn clean install

# Use a lightweight JRE for the final image
FROM eclipse-temurin:17-jre-alpine

# Set working directory in the runtime container
WORKDIR /app

# Copy the built application
COPY --from=build /app/target/*.jar app.jar

# Expose the application's port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
