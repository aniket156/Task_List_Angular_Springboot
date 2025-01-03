# Task List Application

This is a simple task list application built with **Angular** for the frontend and **Spring Boot** for the backend. It allows users to manage tasks, including features like creating, editing, filtering, and deleting tasks. The application interacts with a **PostgreSQL** database.

---

## Technologies Used
- **Frontend**: Angular
- **Backend**: Spring Boot
- **Database**: PostgreSQL

---

## Prerequisites
- **Node.js** and **npm** (for Angular frontend)
- **Java 17+** (for Spring Boot backend)
- **PostgreSQL** (for the database)

---

## Installation

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/aniket156/Task_List_Angular_Springboot.git
```

Navigate to the project directory:

```bash
cd Task_List_Angular_Springboot
```

---

### 2. Configure Database

1. Start PostgreSQL and create a database:

   ```sql
   CREATE DATABASE tasklist;
   ```

2. Create a table in the `tasklist` database:

   ```sql
   CREATE TABLE task (
       id SERIAL PRIMARY KEY,
       entity_name VARCHAR(255) NOT NULL,
       date DATE NOT NULL,
       time TIME NOT NULL,
       task_type VARCHAR(50) NOT NULL,
       contact_person VARCHAR(255),
       note TEXT,
       status VARCHAR(50)
   );
   ```

3. Update the backend database configuration in `src/main/resources/application.properties`:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/tasklist
   spring.datasource.username=your_db_username
   spring.datasource.password=your_db_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```

4. Test the database connection:

   Run the backend to ensure the connection is working correctly. If successful, the application will create the necessary tables automatically if `ddl-auto=update` is set.

---

### 3. Run the Backend

1. Navigate to the backend folder:

   ```bash
   cd 02-backend
   ```

2. Build and run the Spring Boot application:

   ```bash
   ./mvnw spring-boot:run
   ```

   The backend should start on **`http://localhost:8080`**.

---

### 4. Run the Frontend

1. Navigate to the frontend folder:

   ```bash
   cd 01-frontend/task-list-angular
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the Angular development server:

   ```bash
   ng serve
   ```

   The frontend should start on **`http://localhost:4200`**.

---

## Adding Tasks

1. Access the frontend at [http://localhost:4200](http://localhost:4200).
2. Use the "Add Task" modal to enter task details:
   - Entity Name
   - Date & Time
   - Task Type (e.g., Call, Meeting)
   - Contact Person
   - Note
   - Status (e.g., OPEN, CLOSED)

3. Save the task, and it will be stored in the PostgreSQL database via the backend API.

---

## API Endpoints (Backend)

The backend provides the following RESTful API endpoints:

- **GET /api/tasks**: Fetch all tasks.
- **POST /api/tasks**: Add a new task.
- **PUT /api/tasks/{id}**: Update an existing task.
- **DELETE /api/tasks/{id}**: Delete a task by ID.

---

## Ports Configuration

- **Frontend**: `http://localhost:4200`
- **Backend**: `http://localhost:8080`
- Ensure these ports are available on your machine before running the application.

---

## Troubleshooting

- **Database Issues**: Ensure PostgreSQL is running and accessible.
- **Configuration**: Verify database credentials in `application.properties`.
- **Dependencies**: Check that Node.js, npm, and Java are installed correctly.


