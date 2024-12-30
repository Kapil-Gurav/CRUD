# CRUD Operations with Spring Boot, React, and PostgreSQL

## Overview

This project demonstrates a full-stack CRUD (Create, Read, Update, Delete) application. The backend is implemented with **Spring Boot**, the frontend with **React**, and **PostgreSQL** is used as the database. CRUD operations are performed using stored procedures in PostgreSQL to enhance database performance and maintainability.

---
video link - https://drive.google.com/file/d/1ROuxX1ZMsAyRWh-EM_v9tlFIoGcW-QSH/view?usp=sharing

## Features

- **Create**: Add new user data.
- **Read**: Retrieve user data (all users or by ID).
- **Update**: Modify user data using stored procedures.
- **Delete**: Remove user data using stored procedures.
- **Frontend**: A React-based UI for interacting with the application.
- **Backend**: A Spring Boot REST API.
- **Database**: PostgreSQL with stored procedures for optimized data manipulation.

---

## Technologies Used

- **Frontend**: React
- **Backend**: Spring Boot
- **Database**: PostgreSQL
- **Stored Procedures**: PostgreSQL

---

## Prerequisites

1. **Java** (Version 8+)
2. **Node.js** and **npm** (for React frontend)
3. **PostgreSQL**
4. **Spring Boot** dependencies:
   - Spring Web
   - Spring Data JPA
   - PostgreSQL Driver

---

## Installation and Setup

### Backend (Spring Boot)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-name.git

   ```
2. Step up database by running the queries given below.
3. After creating database, in Backend folder define you databse details in application.properties file
   give database name, username and password. 
4.  Run backend:
   just click on run button on your IDE
5. Rum Frontend:
    -npm start

## Database Setup

### Required Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    mobile VARCHAR(50),
    application_name VARCHAR(255),
    hall_name VARCHAR(255),
    rent VARCHAR(50)
);
---------------------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_all_users()
RETURNS TABLE(id BIGINT, email CHARACTER VARYING,
start_date CHARACTER VARYING,end_date CHARACTER VARYING,mobile CHARACTER VARYING
,application_name CHARACTER VARYING,hall_name CHARACTER VARYING,rent CHARACTER VARYING) AS $$
BEGIN
    RETURN QUERY SELECT users.id,users.email,users.start_date,users.end_date,
users.mobile,users.application_name,users.hall_name,users.rent FROM public.users ORDER BY users.id ASC;
END;
$$ LANGUAGE plpgsql;
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE delete_single_user(user_id BIGINT)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if the user exists
    IF EXISTS (SELECT 1 FROM public.users WHERE id = user_id) THEN
        -- Delete the user
        DELETE FROM public.users WHERE id = user_id;
        RAISE NOTICE 'User with ID % has been deleted.', user_id;
    ELSE
        -- Raise an error if the user does not exist
        RAISE EXCEPTION 'User with ID % does not exist.', user_id;
    END IF;
END;
$$;
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE update_single_user(
    user_id BIGINT,
    p_application_name VARCHAR,
    p_hall_name VARCHAR,
    p_email VARCHAR,
    p_mobile VARCHAR,
    p_start_date VARCHAR,
    p_end_date VARCHAR,
    p_rent VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if the user exists
    IF EXISTS (SELECT 1 FROM public.users WHERE id = user_id) THEN
        -- Update the user
        UPDATE public.users 
        SET 
            application_name = p_application_name,
            hall_name = p_hall_name,
            email = p_email,
            mobile = p_mobile,
            start_date = p_start_date,
            end_date = p_end_date,
            rent = p_rent
        WHERE id = user_id;
        
        RAISE NOTICE 'User with ID % has been updated successfully.', user_id;
    ELSE
        -- Raise an error if the user does not exist
        RAISE EXCEPTION 'User with ID % does not exist.', user_id;
    END IF;

    -- Verify the update
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Error occurred while updating user with ID %.', user_id;
    END IF;
END;
$$;
