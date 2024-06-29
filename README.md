# React-Django CRUD Example Project

This is a full-stack web application project that demonstrates a simple CRUD (Create, Read, Update, Delete) functionality using React for the frontend and Django for the backend. The project is a blog-like application where users can register, log in, and manage their posts.

## Features

1. **User Authentication**: Users can register and log in using Django's authentication system.
2. **CRUD Operations**: Users can create, read, update, and delete their own posts.
3. **Post Details**: Each post has a detailed view.
4. **CSRF Protection**: Ensures secure communication between the frontend and backend.

## Technologies Used

- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: Django, Class Based Views, Python
- **Database**: SQLite (default for Django)

## Project Structure

### Frontend

- `src/components`
  - `Navbar.jsx`: Navigation bar with links to Register, Login, All Posts, and Manage Posts.
  - `Register.jsx`: Registration form connected to Django's authentication.
  - `Login.jsx`: Login form connected to Django's authentication.
  - `AllPosts.jsx`: Page displaying all posts with a "Read More" button.
  - `ManagePosts.jsx`: Page for managing user-specific posts.
  - `PostForm.jsx`: Form for creating and updating posts.
  - `PostDetails.jsx`: Detailed view of a post.

### Backend

- `posts/`
  - `views.py`: Contains class-based views for CRUD operations and CSRF token handling.
  - `models.py`: Defines the Post model.
  - `urls.py`: URL routing for API endpoints.
  - `forms.py`: Defines forms for post creation and update.
  - `middleware.py`: Defines csrf custom middleware for error handling
  - `serializers.py`: Defines Model Form and fields from response

## Setup and Installation

### Prerequisites

- Python 3.x
- Node.js and npm

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/react-django.git
   cd react-django/backend
   ```

2. Create a virtual environment and activate it:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up the database:

   ```bash
   python manage.py migrate
   ```

5. Create a superuser for accessing the Django admin:

   ```bash
   python manage.py createsuperuser
   ```

6. Run the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd ../frontend
   ```

2. Install the required packages:

   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## API Endpoints

- **CSRF Token**: `/api/csrf-token/`
- **Check Auth**: `/api/check-auth/`
- **Posts**: `/api/posts/`
- **Create Post**: `/api/posts/create/`
- **Read Post**: `/api/posts/<int:id>/`
- **Update Post**: `/api/posts/<int:id>/edit/`
- **Delete Post**: `/api/posts/<int:id>/delete/`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Django](https://www.djangoproject.com/)
