# BLOG
For testing user can start the authentication from /api/authenticate
Test account to be used 


username: test1


passowrd: teast@123

then the user will recieve a jwt authenticated token 
This token should be attached to every other request made to the api endpoint 

## API Endpoints

### Authentication

- **POST /api/authenticate**
  - Authenticate user and return a JWT token.
  - Input: Email, Password
  - Response: JWT token

### Follow/Unfollow

- **POST /api/follow/{id}**
  - Follow user with {id} (authenticated user).
- **POST /api/unfollow/{id}**
  - Unfollow user with {id} (authenticated user).

### User Profile

- **GET /api/user**
  - Authenticate request and return respective user profile.
  - Response: 
    - User Name
    - Number of Followers
    - Number of Followings

### Posts

- **POST /api/posts/**
  - Add new post created by the authenticated user.
  - Input: Title, Description
  - Response:
    - Post-ID
    - Title
    - Description
    - Created Time (UTC)
- **DELETE /api/posts/{id}**
  - Delete post with {id} created by the authenticated user.
- **POST /api/like/{id}**
  - Like post with {id} by the authenticated user.
- **POST /api/unlike/{id}**
  - Unlike post with {id} by the authenticated user.
- **POST /api/comment/{id}**
  - Add comment for post with {id} by the authenticated user.
  - Input: Comment
  - Response: Comment-ID
- **GET /api/posts/{id}**
  - Return a single post with {id} populated with its number of likes and comments.
- **GET /api/all_posts**
  - Return all posts created by authenticated user sorted by post time.
  - Response:
    - id: ID of the post
    - title: Title of the post
    - desc: Description of the post
    - created_at: Date and time when the post was created
    - comments: Array of comments, for the particular post
    - likes: Number of likes for the particular post

## Error Responses

If there is an error, the API will return an error response in the following format:

```json
{
    "error": {
        "code": "ERROR_CODE",
        "message": "ERROR_MESSAGE"
    }
}
````
The following are the error codes and their respective error messages:

#### BAD_REQUEST:
The request is malformed or missing required parameters.
#### UNAUTHORIZED:
The user is not authenticated or the JWT token is invalid.
#### FORBIDDEN: 
The user is not authorized to perform the action.
#### NOT_FOUND: 
The requested resource is not found.
#### INTERNAL_SERVER_ERROR:
An unexpected error occurred on the server.


### Running the Server
To run the server, you need to have Node.js and NPM installed on your machine. Once you have installed them, follow these steps:

Clone the repository to your local machine.
Navigate to the repository's root directory in your terminal.
Run npm install to install the dependencies.
Run npm start to start the server.
The server should now be running on http://localhost:3000.


