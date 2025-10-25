# Organization-User-Management-App
**A simple full-stack task to manage teams and members as part of a recruitment assessment.  
Built to demonstrate CRUD operations, image uploads, and responsive UI.**

---

# API Documentation

This document provides documentation for a simple REST API used to manage organizations and their associated users.

The API is built using **Node.js**, **Express**, **Sequelize** (as the ORM), and **SQLite** (as the database).

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **ORM:** Sequelize

<br/>

---

## 💾 Database Setup

This project uses **SQLite** for easy setup and portability.

When you run the application for the first time, Sequelize will automatically create a `database.sqlite` file in the `backend` directory. No manual database configuration is needed.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You must have [Node.js](https://nodejs.org/) (which includes npm) installed on your system.

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/sreeramkasulu/Organization-User-Management-App.git
    cd Organization-User-Management-App
    ```

2.  **Set up the Backend:**

    ```sh
    # Navigate to the backend folder
    cd backend

    # Install dependencies
    npm install
    ```

    - **Environment Variables:**
      The backend requires environment variables for image uploading to ImageKit. Create a `.env` file in the `backend` folder.
      For quick testing, you can use these variables. **Please do not misuse them.**
      ```.env
      IMAGEKIT_PRIVATE_KEY=private_mGJIrTqVWdPI2hSE3+mno/AKhAc=
      IMAGEKIT_PUBLIC_KEY=public_eopj0cm2LX/+dr0m3LMSAcC84d4=
      IMAGEKIT_URL_ENDPOINT=[https://ik.imagekit.io/roopesh/](https://ik.imagekit.io/roopesh/)
      ```
    - **Run the backend server:**
      ```sh
      npm start
      ```
      The server will be running on `http://localhost:5000` (or as specified).

3.  **Set up the Frontend:**

    ```sh
    # Navigate to the frontend folder (from the root)
    cd fronteend

    # Install dependencies
    npm install
    ```

    - **Run the frontend app:**
      ```sh
      npm run dev
      ```
      The React development server will start, usually on `http://localhost:5173`.

---

## ✨ Features

- **Full-stack Validation:** All forms are validated on both the frontend (client-side) and backend (server-side) to ensure data integrity.
- **CRUD Operations:** Full Create, Read, Update, and Delete functionality for both **Organizations** and **Users**.
- **Image Uploads:** Seamlessly handles organization image uploads and updates using **ImageKit** for fast cloud storage and delivery.
- **Modern UX & UI:**
  - The frontend includes loaders and error messages to provide clear user feedback.
  - Several actions (like creating or updating data) use **optimistic UI updates** for a faster, more responsive user experience.
  - Features a functional **search bar** and dynamic **breadcrumbs** for easy navigation.
- **Figma-Accurate Design:** The UI is a **100% match** of the provided Figma design file.
- **Fully Mobile Responsive:** The application is fully responsive. As no mobile Figma was provided, styles were intuitively designed to ensure a great user experience on all screen sizes.
- **Status & Role Management:** Easily update an organization's status (`Active`, `Inactive`, `Blocked`) or a user's role (`admin`, `coordinator`) with dedicated controls.

<br/>

## Database Models

The database consists of two models: `Organization` and `User`.

### Organization Model

Stores all information related to an organization.

| Field              | Type    | Constraints                       | Default               |
| :----------------- | :------ | :-------------------------------- | :-------------------- |
| `id`               | INTEGER | Primary Key, Auto-increment       |                       |
| `name`             | STRING  | Not Null                          |                       |
| `slug`             | STRING  | Not Null, Unique                  |                       |
| `adminName`        | STRING  | Allow Null                        |                       |
| `email`            | STRING  | Not Null, IsEmail                 |                       |
| `image`            | STRING  | Allow Null                        |                       |
| `supportEmail`     | STRING  | Allow Null, IsEmail               |                       |
| `contact`          | STRING  | Not Null                          |                       |
| `alternativePhone` | STRING  | Allow Null                        |                       |
| `maxCoordinators`  | INTEGER |                                   | `5`                   |
| `timezone`         | STRING  |                                   | `India Standard Time` |
| `region`           | STRING  |                                   | `Asia/Colombo`        |
| `language`         | STRING  |                                   | `English`             |
| `websiteURL`       | STRING  | Allow Null, IsUrl                 |                       |
| `status`           | ENUM    | ('Active', 'Inactive', 'Blocked') | `Active`              |

### User Model

Stores users, who must belong to an organization.

| Field            | Type    | Constraints                              | Default       |
| :--------------- | :------ | :--------------------------------------- | :------------ |
| `id`             | INTEGER | Primary Key, Auto-increment              |               |
| `name`           | STRING  | Not Null                                 |               |
| `role`           | ENUM    | ('admin', 'coordinator')                 | `coordinator` |
| `organizationId` | INTEGER | Not Null, Foreign Key (Organizations.id) |               |

**Relationship:** An `Organization` has many `Users`. If an `Organization` is deleted, all associated `Users` are also deleted (`onDelete: "CASCADE"`).

---

## Authentication

**No authentication is required** for any endpoint. All routes are public.

---

## API Endpoints

All endpoints are relative to the base URL (e.g., `http://localhost:5000`). The router is mounted on `/org`.

### 1. Get All Organizations

- **Endpoint:** `GET /org`
- **Description:** Retrieves a list of all organizations in the database.
- **Success Response (200 OK):**

  ```json
  [
    {
  "message": "Organization fetched successfully",
  "organization": {
    "id": 1,
    "name": "org 1",
    "slug": "org test 1",
    "adminName": null,
    "email": "org1@mail.com",
    "supportEmail": "org1support@mail.com",
    "contact": "999999999",
    "alternativePhone": null,
    "maxCoordinators": 5,
    "timezone": "India Standard Time",
    "region": "Asia/Colombo",
    "language": "English",
    "websiteURL": null,
    "status": "Active",
    "createdAt": "2025-10-22T11:54:11.943Z",
    "updatedAt": "2025-10-22T12:02:15.206Z"
  },{
    "message": "Organization fetched successfully",
    "organization": {
    "id": 1,
    "name": "org 2",
    "slug": "org test 2",
    "adminName": null,
    "email": "org2@mail.com",
    "supportEmail": "org2support@mail.com",
    "contact": "888888888",
    "alternativePhone": null,
    "maxCoordinators": 5,
    "timezone": "India Standard Time",
    "region": "Asia/Colombo",
    "language": "English",
    "websiteURL": null,
    "status": "Active",
    "createdAt": "2025-10-22T11:54:11.943Z",
    "updatedAt": "2025-10-22T12:02:15.206Z"
    }
  ]
  ```

### 2. Get Organization by ID

- **Endpoint:** `GET /org/:id`
- **Description:** Retrieves a single organization by its unique ID.
- **Success Response (200 OK):**

  ```json
  {
    "message": "Organization fetched successfully",
    "organization": {
      "id": 1,
      "name": "org 1",
      "slug": "org test 1",
      "adminName": null,
      "email": "org1@mail.com",
      "supportEmail": "org1support@mail.com",
      "contact": "999999999",
      "alternativePhone": null,
      "maxCoordinators": 5,
      "timezone": "India Standard Time",
      "region": "Asia/Colombo",
      "language": "English",
      "websiteURL": null,
      "status": "Active",
      "createdAt": "2025-10-22T11:54:11.943Z",
      "updatedAt": "2025-10-22T12:02:15.206Z"
    }
  }
  ```

- **Error Response (404 Not Found):**
  ```json
  {
    "message": "Organization not found"
  }
  ```

### 3. Create Organization

- **Endpoint:** `POST /org`
- **Description:** Creates a new organization.
- **Request Body (JSON):**
  - Only `name`, `slug`, `contact`, and `email` are accepted.
  ```json
  {
    "name": "New Tech LLC",
    "slug": "new-tech",
    "contact": "5551234567",
    "email": "info@newtech.com"
  }
  ```
- **Success Response (201 Created):**
  - Returns the newly created organization object with default values.
  ```json
  {
    "message": "Organization created successfully",
    "organization": {
      "maxCoordinators": 5,
      "timezone": "India Standard Time",
      "region": "Asia/Colombo",
      "language": "English",
      "status": "Active",
      "id": 2,
      "name": "org 1 chang",
      "slug": "org test 2",
      "contact": "999999999",
      "email": "org1@mail.com",
      "updatedAt": "2025-10-22T12:15:08.718Z",
      "createdAt": "2025-10-22T12:15:08.718Z"
    }
  }
  ```

### 4. Update Organization

- **Endpoint:** `PATCH /org/:id`
- **Description:** Updates specific details of an existing organization.
- **Request Body (JSON):**
  - Only the following fields are allowed for patching:
    - `adminName`
    - `supportEmail`
    - `alternativePhone`
    - `maxCoordinators`
    - `timezone`
    - `region`
    - `language`
    - `websiteURL`
  ```json
  {
    "adminName": "John Doe",
    "supportEmail": "support@newtech.com",
    "websiteURL": "[https://newtech.com](https://newtech.com)",
    "maxCoordinators": 10
  }
  ```
- **Success Response (200 OK):**
  - Returns the completely updated organization object.
  ```json
  {
    "message": "Organization updated successfully",
    "organization": {
      "id": 3,
      "name": "New Tech LLC",
      "slug": "new-tech",
      "adminName": "John Doe",
      "email": "info@newtech.com",
      "supportEmail": "support@newtech.com",
      "contact": "5551234567",
      "alternativePhone": null,
      "maxCoordinators": 10,
      "timezone": "India Standard Time",
      "region": "Asia/Colombo",
      "language": "English",
      "websiteURL": "https://newtech.com",
      "status": "Active",
      "createdAt": "2025-10-22T12:10:00.000Z",
      "updatedAt": "2025-10-22T12:15:00.000Z"
    }
  }
  ```

### 5. Delete Organization

- **Endpoint:** `DELETE /org/:id`
- **Description:** Deletes an organization by its ID.
- **Note:** This action will also delete all associated users from the `Users` table.
- **Success Response (200 OK):**
  ```json
  {
    "message": "Organization deleted successfully"
  }
  ```
- **Error Response (404 Not Found):**
  ```json
  {
    "message": "Organization not found"
  }
  ```

### 6. Update Organization Status

- **Endpoint:** `PATCH /org/status/:id`
- **Description:** Updates the status of a specific organization by its ID.
- **Request Body (JSON):**
  - Must provide a `status` field.
  - Allowed values are: `"Active"`, `"Inactive"`, or `"Blocked"`.
  ```json
  {
    "status": "Inactive"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "message": "✅ Status updated successfully",
    "org": {
      "id": 1,
      "status": "Inactive"
    }
  }
  ```
- **Error Responses:**
  - **404 Not Found:** If the organization with `:id` does not exist.
    ```json
    {
      "error": "Organization not found"
    }
    ```
  - **400 Bad Request:** If the `status` value is missing or not one of the allowed values.
    ```json
    {
      "error": "Invalid status value"
    }
    ```

### 7. Update Organization Image

- **Endpoint:** `PATCH /org/image/:id`
- **Description:** Uploads or updates the image for a specific organization. This endpoint expects `multipart/form-data`.
- **Request Body:**
  - **Type:** `multipart/form-data`
  - **Field:** The request must include a file attached to a field. (e.g., a field named `image`).
- **Success Response (200 OK):**
  ```json
  {
    "message": "✅ Image uploaded successfully",
    "imageUrl": "[https://ik.imagekit.io/your-id/org-images/1_1678886400000_logo.png](https://ik.imagekit.io/your-id/org-images/1_1678886400000_logo.png)"
  }
  ```
- **Error Responses:**
  - **400 Bad Request:** If no file is attached to the request.
    ```json
    {
      "error": "No image uploaded"
    }
    ```
  - **404 Not Found:** If the organization with `:id` does not exist.
    ```json
    {
      "error": "Organization not found"
    }
    ```
  - **500 Internal Server Error:** If the file upload to the external service (ImageKit) fails.
    ```json
    {
      "error": "Failed to upload image"
    }
    ```

<br/>

<!-- --- -->

<br/>

# User API Endpoints

All endpoints are relative to the base URL (e.g., `http://localhost:3000`). The router is mounted on `/users`.

### 1. Create User

- **Endpoint:** `POST /users`
- **Description:** Creates a new user and associates them with an organization.
- **Request Body (JSON):**
  - `name` (String, **Required**)
  - `organizationId` (Integer, **Required**)
  - `role` (String, Optional) - Must be `"admin"` or `"coordinator"`. Defaults to `"coordinator"`.
  ```json
  {
    "name": "Alex Smith",
    "role": "admin",
    "organizationId": 1
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": 12,
      "name": "Alex Smith",
      "role": "admin",
      "organizationId": 1,
      "updatedAt": "2025-10-22T12:30:00.000Z",
      "createdAt": "2025-10-22T12:30:00.000Z"
    }
  }
  ```
- **Error Responses:**
  - **400 Bad Request:** If `name` or `organizationId` is missing.
    ```json
    {
      "message": "Name and organizationId are required"
    }
    ```
  - **404 Not Found:** If the specified `organizationId` does not exist.
    ```json
    {
      "message": "Organization not found"
    }
    ```

### 2. Get Users by Organization

- **Endpoint:** `GET /users/org/:organizationId`
- **Description:** Retrieves a list of all users belonging to a specific organization.
- **Success Response (200 OK):**
  ```json
  {
    "message": "Users fetched successfully",
    "users": [
      {
        "id": 12,
        "name": "Alex Smith",
        "role": "admin",
        "organizationId": 1,
        "createdAt": "2025-10-22T12:30:00.000Z",
        "updatedAt": "2025-10-22T12:30:00.000Z"
      },
      {
        "id": 13,
        "name": "Sam Lee",
        "role": "coordinator",
        "organizationId": 1,
        "createdAt": "2025-10-22T12:31:00.000Z",
        "updatedAt": "2025-10-22T12:31:00.000Z"
      }
    ]
  }
  ```
- **Error Response (404 Not Found):**
  - If the specified `organizationId` does not exist.
    ```json
    {
      "message": "Organization not found"
    }
    ```

### 3. Update User

- **Endpoint:** `PATCH /users/:id`
- **Description:** Updates a user's details. All fields are optional.
- **Request Body (JSON):**
  - `name` (String, Optional)
  - `role` (String, Optional)
  - `organizationId` (Integer, Optional) - Can be used to move a user to a new organization. [but not here !].
  ```json
  {
    "name": "Alex J. Smith",
    "role": "coordinator"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "message": "User updated successfully",
    "user": {
      "id": 12,
      "name": "Alex J. Smith",
      "role": "coordinator",
      "organizationId": 1,
      "createdAt": "2025-10-22T12:30:00.000Z",
      "updatedAt": "2025-10-22T12:35:00.000Z"
    }
  }
  ```
- **Error Responses:**
  - **404 Not Found:** If the user with `:id` does not exist.
    ```json
    {
      "message": "User not found"
    }
    ```
  - **404 Not Found:** If a new `organizationId` is provided but does not exist.
    ```json
    {
      "message": "Organization not found"
    }
    ```

### 4. Delete User

- **Endpoint:** `DELETE /users/:id`
- **Description:** Deletes a user by their unique ID.
- **Success Response (200 OK):**
  ```json
  {
    "message": "User deleted successfully"
  }
  ```
- **Error Response (404 Not Found):**
  ```json
  {
    "message": "User not found"
  }
  ```

## 👨‍💻 Author

**Made by:** Penke Sreeram Kasulu 
