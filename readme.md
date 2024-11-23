### **Recipe Management App - Backend**

A Node.js-based backend application for managing recipes with user authentication and authorization. Users can perform CRUD operations on their own recipes and search for recipes by various filters.

---

### **Features**

1. **User Authentication**:

   - Signup: Register a new user.
   - Login: Authenticate users with JWT-based token generation.
   - Logout: Invalidate user session.

2. **Recipe Management**:

   - **Create**: Users can add their own recipes.
   - **Read**: Users can view all recipes or a specific recipe by ID.
   - **Update**: Users can update their own recipes.
   - **Delete**: Users can delete their own recipes.

3. **Search Recipes**:

   - Search by `title`, `author`, or `cuisine`.

4. **Authentication and Authorization**:

   - JWT-based authentication for secure endpoints.
   - Authorization to ensure users can only update/delete their own recipes.

5. **Error Handling**:
   - Handles invalid requests and server errors gracefully.

---

### **Tech Stack**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JSON Web Tokens (JWT)
- **Other Tools**: Postman for testing APIs

---

### **Folder Structure**

```
project-folder/
├── controllers/         # Contains logic for handling API requests
│   ├── recipeController.js
│   ├── userController.js
├── middlewares/         # Middleware for authentication
│   ├── authMiddleware.js
├── models/              # Mongoose schema definitions
│   ├── recipeSchema.js
│   ├── userSchema.js
├── routes/              # Defines API routes
│   ├── recipeRoutes.js
│   ├── userRoutes.js
├── utils/               # Utility function
├── .env                 # Environment variables (e.g., DB_URI, JWT_SECRET)
├── server.js            # Entry point for the application
├── README.md            # Documentation
├── package.json         # Dependencies and scripts
```

---

### **Setup and Usage**

#### **1. Clone the repository**

```bash
git clone https://github.com/your-username/recipe-management-app.git
cd recipe-management-app
```

#### **2. Install dependencies**

```bash
npm install
```

#### **3. Configure environment variables**

Create a `.env` file in the root directory with the following keys:

```
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### **4. Start the server**

```bash
npm start
```

The server will run at `http://localhost:5000`.

---

### **API Endpoints**

Here is the updated **API Endpoints** section for your Recipe Management App:

---

### **API Endpoints**

#### **User APIs**

| Method   | Endpoint       | Description         |
| -------- | -------------- | ------------------- |
| **POST** | `/user/signup` | Register a new user |
| **POST** | `/user/login`  | Authenticate a user |
| **POST** | `/user/logout` | Logout a user       |

---

#### **Recipe APIs**

| Method     | Endpoint             | Description                                          |
| ---------- | -------------------- | ---------------------------------------------------- |
| **GET**    | `/recipe/`           | Retrieve all recipes                                 |
| **GET**    | `/recipe/get/:id`    | Retrieve a specific recipe by ID                     |
| **GET**    | `/recipe/search`     | Search recipes by title, author, or cuisine          |
| **POST**   | `/recipe/create`     | Create a new recipe                                  |
| **PATCH**  | `/recipe/update/:id` | Update a specific recipe (only the author's recipes) |
| **DELETE** | `/recipe/delete/:id` | Delete a specific recipe (only the author's recipes) |

---

### Additional Notes:

- **Authorization**: The `validate` middleware ensures only logged-in users can create, update, or delete recipes.
- **Search**: Use the `/recipe/search` endpoint to filter recipes by query parameters like `title`, `author`, or `cuisine`.

#### **Search Example**

`GET /api/recipe/search?title=pizza&cuisine=Italian`

---

### **Testing**

1. Use Postman or any API testing tool.
2. Include the JWT token in the `Authorization` header for protected routes:
   ```
   Authorization: Bearer <token>
   ```
