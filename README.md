# Lead Capture Application

## 1. Background

### Purpose
This application is a Lead Management System that allows users to:
- Capture lead information through a form (name, email, phone, company, and notes)
- View all captured leads in a tabular format
- Store leads persistently in an H2 database
- Perform basic CRUD operations on leads

The application follows a client-server architecture with React frontend and Spring Boot backend.

### Tech Stack
**Frontend:**
- React.js (with hooks)
- Axios for API calls
- Material-UI for styling
- HTML5/CSS3

**Backend:**
- Java 17
- Spring Boot 3.x
- Spring Data JPA
- H2 Database (in-memory or file-based)
- Lombok for boilerplate reduction

**Development Tools:**
- Maven
- Git for version control
- Postman/Insomnia for API testing
- H2 Console for database management

### Setup Instructions

**Prerequisites:**
- Java JDK 17
- Node.js (for frontend)
- Maven 3.8+

**Installation:**
1. Clone the repository:
   ```bash
   git clone [repository-url]


## Backend

First of all Install Java and Maven in your local machine.

- Then navigate to the `demo` project and run
    `mvn clean install`
- After installation, run the following command to run the server
    `mvn spring-boot:run`

###### H2 Database will be available on `http://localhost:8080/h2-console`

- For URL: type `jdbc:h2:mem:testdb`
- For user: type `sa`

Leave everything else as it is.

## Frontend 

First of all you need to install node and npm in your machine

- Navigate to frontend folder and run command
    `npm install`
- After installation run the following command to run the React server 
    `npm run start`
    
## Module Requirements
#### Functional Requirements

###### Lead Management
- Create, Read, Update, Delete leads
- Form validation for required fields
- Email format validation
###### Data Access
- Persist leads in H2 database
- Retrieve leads with sorting pagination
###### API Endpoints
- RESTful endpoints for all operations
- Proper HTTP status codes

#### Non-Functional Requirements
###### Performance
- API response time < 500ms for basic operations
- Display all leads properly
###### Security
- Input validation/sanitization
###### Maintainability
- Clean code structure
- Comprehensive documentation


## Implementation Details

#### Backend

###### Key Classes

    ** LeadController.java **

        Handles HTTP requests and responses

        REST endpoints for lead operations

    ** LeadService.java **

        Contains business logic

        Handles transactions

    ** LeadRepository.java **

        Spring Data JPA interface

        Custom query methods

    ** Lead.java **

        JPA entity class

        Database mapping



## Database Schema
H2 Database Configuration

In-memory or file-based (configured in application.properties)

Auto-created schema from JPA entities

Console enabled for development

    Lead Entity Schema
    Field	Type	Constraints
    id	    BIGINT	PRIMARY KEY, AUTO_INCREMENT
    name	VARCHAR(255)	NOT NULL
    email	VARCHAR(255)	NOT NULL, UNIQUE
    phone	VARCHAR(20)	
    company	VARCHAR(255)	
    notes	TEXT	
    created_at	TIMESTAMP	Auto-set on creation


## API Documentation
Endpoints

    Base URL: http://localhost:8080/api/leads
    Method	Endpoint	Description
    POST	/	        Create new lead
    GET	    /	        Get all leads
    PUT	    /{id}	    Update lead
    DELETE	/{id}	    Delete lead