# Product API

This project is a backend application developed using Express.js and MongoDB. The application is capable of performing basic CRUD (Create, Read, Update, Delete) operations such as managing products and users. Additionally, it handles common needs like session management and error handling.

### ERD

![ERD](./erd.png)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Documentation](#documentation)
- [Endpoints](#endpoints)
- [Project Skeleton](#project-skeleton)

## Live Demo

[Product API](https://productapi-6sri.onrender.com/)

## Technologies Used

- express
- cors
- dotenv
- mongoose
- express-async-errors
- cookie-session
- swagger-ui-express
- redoc-express

### Documentation

- Swagger UI: [https://productapi-6sri.onrender.com/documents/swagger](https://productapi-6sri.onrender.com/documents/swagger)
- Redoc: [https://productapi-6sri.onrender.com/documents/redoc](https://productapi-6sri.onrender.com/documents/redoc)
- JSON Documentation: [https://productapi-6sri.onrender.com/documents/json](https://productapi-6sri.onrender.com/documents/json)

## Endpoints

### Users

- `GET /user`: Lists all users.
- `POST /user`: Creates a new user.
- `GET /user/:userId`: Displays a specific user.
- `PUT /user/:userId`: Updates information of a specific user.
- `DELETE /user/:userId`: Deletes a specific user.
- `POST /user/login`: Logs a user in.
- `POST /user/logout`: Logs a user out.

### Product Categories

- `GET /products/categories`: Lists all product categories.
- `POST /products/categories`: Creates a new product category.
- `GET /products/categories/:categoryId`: Displays a specific product category.
- `PUT /products/categories/:categoryId`: Updates information of a specific product category.
- `DELETE /products/categories/:categoryId`: Deletes a specific product category.

### Products

- `GET /products`: Lists all products.
- `POST /products`: Creates a new product.
- `GET /products/:productId`: Displays a specific product.
- `PUT /products/:productId`: Updates information of a specific product.
- `DELETE /products/:productId`: Deletes a specific product.

## Project Skeleton

```
Product API (folder) 
│
├── src
│    ├── configs
│    │     └── dbConnection.js
│    ├── controllers
│    │     ├── productController.js     
│    │     └── userController.js
│    ├── helpers   
│    │     └── passwordEncrypt.js 
│    ├── middlewares 
│    │     ├── errorHandler.js 
│    │     ├── queryHandler.js   
│    │     └── userControl.js 
│    ├── models                
│    │     ├── productModel.js     
│    │     └── userModel.js
│    ├── routes                
│    │     ├── productRouter.js     
│    │     └── userRouter.js
│    └── sync.js
├── .env
├── .gitignore
├── index.js
├── package.json
├── swagger.json
├── swaggerAutogen.js
└── README.md
```