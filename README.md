Book Review API Backend Documentation

1. Clone the Repository
First, clone the repository from GitHub:



git clone https://github.com/mdirshad9211/Book-Review-System-BE
cd book-review-api
2. Install Dependencies
Navigate to the project folder and install the dependencies:


npm install
3. Set Up Environment Variables
Create a .env file in the root directory of the project:


touch .env
Inside the .env file, add the following configurations:


PORT=5000
JWT_SECRET=your_jwt_secret
MONGODB_URI=mongodb://localhost:27017/bookreviewdb
PORT: The port the server will run on (default is 5000).

JWT_SECRET: A secret key used for JWT authentication (use a long and complex string).

MONGODB_URI: The MongoDB connection string (if using MongoDB Atlas, provide the cloud URI).

4. Start the Server
Run the following command to start the server:

npm start
The application will start running on http://localhost:5000.

API Endpoints
Authentication Endpoints
1. POST /signup - Register a New User
Description: Registers a new user in the system.

Request Body:
json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
Response:
201 Created: {"message": "User created successfully"}
400 Bad Request: Invalid input data.
500 Internal Server Error: Error while creating user.


2. POST /login - Login and Get JWT Token
Description: Authenticates the user and returns a JWT token.

Request Body:
json
{
  "email": "john@example.com",
  "password": "password123"
}
Response:
200 OK: {"token": "your_jwt_token"}
404 Not Found: User not found.
400 Bad Request: Invalid credentials.

Book Endpoints
1. POST /books - Add a New Book (Authenticated)
Description: Authenticated users can add new books.

Request Body:
json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Classic"
}
Response:
201 Created: {"_id": "book_id", "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "genre": "Classic"}
401 Unauthorized: JWT token missing or invalid.
500 Internal Server Error: Error while adding the book.

2. GET /books - Get All Books with Optional Filters
Description: Retrieve a list of books, with optional filters for author and genre.

Query Parameters (optional):
author: Filter books by author's name (case-insensitive).
genre: Filter books by genre.
page: Page number for pagination (default 1).
limit: Number of books per page (default 10).
Response:
200 OK: [{ "_id": "book_id", "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "genre": "Classic" }]

500 Internal Server Error: Error while fetching books.

3. GET /books/:id - Get Book Details by ID
Description: Retrieve details of a specific book by its ID, including average rating and reviews.

Response:

200 OK:

json

{
  "book": {
    "_id": "book_id",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Classic",
    "reviews": [...reviews]
  },
  "averageRating": 4.5
}
404 Not Found: Book not found.

500 Internal Server Error: Error while fetching book details.

Review Endpoints
1. POST /books/:id/reviews - Submit a Review for a Book (Authenticated)
Description: Authenticated users can submit a review for a book.

Request Body:

json

{
  "rating": 5,
  "comment": "Amazing book!"
}
Response:

201 Created: Review created successfully.

json

{
  "_id": "review_id",
  "book": "book_id",
  "user": "user_id",
  "rating": 5,
  "comment": "Amazing book!"
}
400 Bad Request: Invalid rating or comment.

401 Unauthorized: JWT token missing or invalid.

404 Not Found: Book not found.

409 Conflict: User has already reviewed this book.

2. PUT /reviews/:id - Update Your Review
Description: Update a previously submitted review by the logged-in user.

Response:
200 OK: Review updated successfully.
400 Bad Request: Invalid data or review not found.
401 Unauthorized: User is not authorized to update this review.
404 Not Found: Review not found.

3. DELETE /reviews/:id - Delete Your Review
Description: Delete a review submitted by the logged-in user.


Response:
200 OK: Review deleted successfully.
401 Unauthorized: User is not authorized to delete this review.
404 Not Found: Review not found.


Signup Request:
curl -X POST -H "Content-Type: application/json" -d '{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}' http://localhost:5000/signup



Login Request:
curl -X POST -H "Content-Type: application/json" -d '{
  "email": "john@example.com",
  "password": "password123"
}' http://localhost:5000/login




Add a Book Request (Authenticated):
curl -X POST -H "Authorization: Bearer <your_jwt_token>" -H "Content-Type: application/json" -d '{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Classic"
}' http://localhost:5000/books
