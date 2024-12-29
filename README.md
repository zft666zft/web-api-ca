# Assignment 2 - Web API.

**Name**: Futong Zhu  
**Student Number**: 20108799  

## Features.

+ **Feature 1: User Authentication System** - Integration of a comprehensive user authentication system supporting registration, login, and session management with JWT.
+ **Feature 2: Protected Routes** - Implementation of protected routes in the React application to ensure that certain functionalities are accessible only to authenticated users.
+ **Feature 3: Environment Configuration Management** - Utilization of `.env` files in both the frontend and backend for secure and flexible configuration management.
+ **Feature 4: Comprehensive Error Handling** - Development of robust error handling mechanisms to manage API errors and provide user-friendly error messages.
+ **Feature 5: Data Persistence with MongoDB** - Extension of the backend to include MongoDB for storing user data such as reviews and watchlist entries, enabling complex data management tasks.

## Setup requirements.

To run the app locally after cloning the repository, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/zft666zft/web-api-ca.git
   ```

2. Access to the backend
   ```bash
   cd movies-api
   ```

3. Install dependencies for backend:
   ```bash
   npm install
   ```

4. Set up `.env` file
   ```env
   NODE_ENV=development
   PORT=8080
   HOST=localhost
   MONGO_DB=YourMongoURL
   TMDB_KEY=your_tmdb_api_key
   SECRET=YourJWTSecret
   ```

5. Start up backend
   ```bash
   npm run dev
   ```
6. Access to the frontend
   ```bash
   cd..
   cd react-movies
   ```
7. Install dependencies
   ```bash
   npm install
   ```

8. Set up `.env` file:
   ```env
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key
   ```
9. Start the frontend:
   ```bash
   npm start
   ```

## API Configuration

1. In `.env` file of movies-api
   ```env
   NODE_ENV=development
   PORT=8080
   HOST=localhost
   MONGO_DB=YourMongoURL
   TMDB_KEY=your_tmdb_api_key
   SECRET=YourJWTSecret
   ```

2. In `.env` file of react-movies
   ```env
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key
   ```

## API Design
Here is an overview of the API design for  `movies-api` project based on the files provided:

### 1. Actors API (`movies-api/api/actors/index.js`)
- **GET /api/actors/tmdb/actor/:id** - Fetches actor details from TMDB.
- **GET /api/actors/tmdb/actor/:id/movies** - Retrieves movies featuring a specific actor from TMDB.
- **GET /api/actors/tmdb/name/:name** - Searches actors by name in TMDB.
- **GET /api/actors/tmdb/gender/:gender** - Filters actors by gender in TMDB.
- **GET /api/actors/tmdb/popularity/:min/:max** - Finds actors within a specific popularity range from TMDB.
- **GET /api/actors/tmdb/popularity/:threshold** - Gets actors with popularity above a certain threshold from TMDB.
- **GET /api/actors** - Lists all actors from MongoDB with pagination.
- **GET /api/actors/:id** - Fetches details of a specific actor from MongoDB.
- **GET /api/actors/name/:name** - Searches actors by name with pagination in MongoDB.
- **GET /api/actors/gender/:gender** - Filters actors by gender with pagination in MongoDB.
- **GET /api/actors/popularity/:min/:max** - Filters actors by popularity range in MongoDB.
- **GET /api/actors/popularity/:threshold** - Gets actors with popularity above a specific value in MongoDB.

### 2. Movies API (`movies-api/api/movies/index.js`)
- **GET /api/movies/tmdb/movies** - Lists movies with pagination from TMDB.
- **GET /api/movies/tmdb/movie/:id** - Retrieves specific movie details from TMDB.
- **GET /api/movies/tmdb/upcoming** - Fetches upcoming movies from TMDB.
- **GET /api/movies/tmdb/hot** - Lists hot movies with pagination from TMDB.
- **GET /api/movies/tmdb/top-rated** - Shows top-rated movies with pagination from TMDB.
- **GET /api/movies/tmdb/trending** - Lists trending movies with pagination from TMDB.
- **GET /api/movies/tmdb/genres** - Fetches movie genres from TMDB.
- **GET /api/movies/tmdb/movie/:id/images** - Retrieves images related to a specific movie from TMDB.
- **GET /api/movies/tmdb/recommendations/:movieId** - Gets movie recommendations based on a specific movie from TMDB.
- **GET /api/movies/tmdb/similar/:movieId** - Lists similar movies based on a specific movie from TMDB.
- **GET /api/movies/tmdb/cast/:movieId** - Fetches the cast of a specific movie from TMDB.
- **GET /api/movies/tmdb/credits/:movieId** - Gets movie credits (cast and crew) for a specific movie from TMDB.
- **GET /api/movies/tmdb/videos/:movieId** - Fetches videos related to a specific movie from TMDB.
- **GET /api/movies** - Lists movies with pagination from MongoDB.
- **GET /api/movies/:id** - Fetches specific movie details from MongoDB.
- **GET /api/movies/language/:lang** - Lists movies filtered by original language from MongoDB.
- **GET /api/movies/popularity/:min/:max** - Filters movies by popularity range in MongoDB.
- **GET /api/movies/release-year/:year** - Lists movies released in a specific year from MongoDB.
- **GET /api/movies/vote_average/:min/:max** - Filters movies by vote average in MongoDB.
- **GET /api/movies/highly_rated/:threshold** - Lists highly-rated movies above a specific vote average from MongoDB.
- **GET /api/movies/vote_count/:min/:max** - Lists movies filtered by vote count from MongoDB.
- **GET /api/movies/popular/:threshold** - Filters movies by popularity above a specific value from MongoDB.
- **GET /api/movies/genre/:genreId** - Lists movies by genre ID from MongoDB.
- **GET /api/movies/:id/similar** - Fetches similar movies based on genres of a specific movie from MongoDB.

### 3. Reviews API (`movies-api/api/reviews/index.js`)
- **GET /api/reviews/tmdb/movie/:movieId** - Fetches reviews for a specific movie from TMDB.
- **GET /api/reviews/movie/:movieId** - Retrieves all reviews for a specific movie from MongoDB.
- **POST /api/reviews/movie/:movieId** - Adds a new review for a movie in MongoDB.

### 4. Users API (`movies-api/api/users/index.js`)
- **GET /api/users** - Lists all users.
- **POST /api/users** - Register or authenticate a user based on query parameters.
- **PUT /api/users/:id** - Updates user details.




## Security and Authentication

### Authentication and Security Details

The `AuthContextProvider` in `authContext.js` manages the authentication state of the application using several key functions that interact with backend API and local storage. Here's a breakdown:

1. **Token Management**:
   - **Local Storage**: Upon successful login, the authentication token received from the server is stored in the browser's local storage using the `localStorage.setItem("token", data)` method. This token is then used for maintaining user sessions and is likely included in subsequent API requests to authenticate user actions.
   - **Token Retrieval**: When the context provider initializes, it attempts to retrieve an existing token from local storage (`localStorage.getItem("token")`), which helps in maintaining user sessions across page reloads.

2. **Authentication Functions**:
   - **`authenticate`**: This function is triggered during the login process. It calls the `login` API, passing the username and password. If the login is successful (i.e., a token is received), the token is saved both in local storage and state, and the user's authenticated status is updated to `true`.
   - **`register`**: During user registration, this function calls the `signup` API with the username and password. Depending on the response (`result.code`), it returns `true` for a successful registration (HTTP status code 201) and `false` otherwise. Note: It doesn’t automatically log the user in or handle the authentication token during registration.

3. **Sign Out**:
   - **`signout`**: This function clears the authentication state and effectively logs the user out. It's a simple implementation that sets `isAuthenticated` to `false` after a short delay, without clearing the token from local storage which could be considered an area to improve for enhanced security.

### Protected Routes
The details from `authContext.js` and `protectedRoutes.js`confirm the mechanisms used to protect routes, as shown in the main application router configuration (`react-movies/src/index.js`). Routes that require user authentication are wrapped in a `ProtectedRoutes` component, which would utilize the `isAuthenticated` state to determine if the user should be granted access or redirected.


## Integrating with React App

### Integration of the React App with the API

#### Process Explanation
Integration process is set up in such a way that the React application communicates with the backend (Node.js), which in turn fetches data from the TMDB API and possibly stores or processes this data before sending it to the frontend. Here's how it's organized:

1. **Backend**:
   - **Fetching Data from TMDB**: The backend uses the `tmdb-api.js` to make HTTP requests to the TMDB API. It fetches various data such as movies, movie details, genres, etc., based on the routes accessed by the frontend.
   - **Serving Data to Frontend**: In api, routes are defined to handle requests from the frontend. These routes call the appropriate functions from `tmdb-api.js` to fetch data from TMDB and then return this data to the frontend in response to API calls.

2. **Frontend**:
   - **API Calls to Backend**: The frontend makes HTTP requests to the backend instead of directly fetching from TMDB. This is done through a modified `tmdb-api.js` on the frontend that points to backend server (`http://localhost:8080/api`).
   - **Usage of Data in Views**: The data fetched from these API calls is used to render different views and components in React application.

#### Views Using the Web API instead of TMDB API Directly

All views in React app now interact with Web API, which acts as a middleware between the TMDB API and frontend. This means any data regarding movies, genres, recommendations, etc., are requested from backend, not directly from TMDB.

### Updates to the React App from Assignment One

1. **Data Fetching**:
   - Changed the data fetching mechanism from directly querying TMDB to routing these requests through the backend. This modification is seen in the `react-movies\src\api\tmdb-api.js`, where the base URL now points to backend.

2. **Authentication and Authorization**:
   - Added `authContext.js`: Manages user authentication states and functions (login, registration, and sign out).
   - Added `loginPage.js` and `signUpPage.js`: Provides user interface for login and registration functionalities.
   - Added `protectedRoutes.js`: Controls access to certain routes based on authentication status, ensuring that some parts of the app can only be accessed by logged-in users.

3. **UI Components and Routing**:
   - Updated `siteHeader\index.js`: Likely to include links or navigation changes based on user authentication status.
   - Updated `index.js`: Includes routing configurations that integrate the newly added protected routes and authentication context.


## Independent learning (if relevant)

1. Learn to use the axios library.

2. Create new MongoDB collection added along with multiple related endpoints.

3. Integrate frontend and backend.

4. Use css to beautify pages.


