# E-Learning: A Full-Stack MERN LMS Platform

This is a comprehensive, full-stack Learning Management System (LMS) built with the MERN stack (MongoDB, Express, React, Node.js) and modern tooling. It is a feature-rich platform, similar to a small-scale Udemy, designed with distinct user roles for **Students** and **Instructors**.

For **Students**, it provides a marketplace to discover, purchase, and consume online courses.
For **Instructors**, it offers a complete content management system to create, manage, and monetize their courses.

## Key Features

The platform is divided into two main user experiences:

### For Students
* **Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
* **Course Discovery:** Browse a gallery of all published courses.
* **Advanced Search & Filtering:** A dedicated search page to find courses by title or category and sort by price.
* **Secure Payments:** Seamless and secure course purchasing powered by **Stripe**.
* **Personalized Dashboard:** A "My Learning" page showing all enrolled courses.
* **Course Progression:** A dedicated video player page that tracks user progress, marking lectures as "viewed" as they are completed.
* **Profile Management:** Users can view their profile and update their name and profile picture.
* **AI Assistant:** An integrated chatbot (powered by Ollama) to answer user questions and recommend courses from the database.

### For Instructors (Admin)
* **Protected Admin Dashboard:** A secure, role-based admin panel accessible only to instructors.
* **Analytics:** A dashboard displaying key metrics like Total Sales and Total Revenue, complete with charts.
* **Course Management (CRUD):** Full create, read, update, and delete functionality for courses.
* **Lecture Management (CRUD):** A nested interface to create, edit, and manage lectures for each course.
* **Rich Content Creation:** A rich text editor for detailed course descriptions.
* **Media Uploads:** Scalable image (thumbnails) and video (lecture content) uploads handled by **Cloudinary**.
* **Publishing Control:** Instructors can toggle their courses between "Published" and "Draft" status.

## 💻 Technology Stack

This project is decoupled into a `client` (React SPA) and `server` (Express REST API).

### **Frontend (Client)**
* **React (v19):** Used for building the component-based, interactive user interface.
* **Vite:** Powers the fast, modern build process and development server.
* **React Router (v7):** For all client-side routing, protected routes, and nested layouts.
* **Redux Toolkit (RTK Query):** For robust global state management and all API data fetching, caching, and state synchronization.
* **Tailwind CSS:** For all utility-first styling.
* **shadcn/ui:** Provides the core, accessible, and themeable component library (Cards, Buttons, Dialogs, etc.).

### **Backend (Server)**
* **Node.js:** The JavaScript runtime for the server.
* **Express.js:** The web framework used to build the RESTful API, manage routes, and handle middleware.
* **MongoDB:** The NoSQL database used to store all application data (users, courses, etc.).
* **Mongoose:** An Object Data Modeler (ODM) for modeling and validating our database schemas.
* **JSON Web Tokens (JWT):** For stateless, secure user authentication. Implemented via HTTP-only cookies.
* **Multer:** Middleware for handling `multipart/form-data`, used for file uploads.

### **External Services**
* **Stripe:** For processing all payments and managing checkouts.
* **Cloudinary:** For scalable cloud-based storage, optimization, and delivery of all user-uploaded images and videos.
* **Ollama (Mistral):** Provides the AI model for the integrated chatbot.

## 🚀 Getting Started

To run this project locally, you will need to set up both the backend server and the frontend client.

### Prerequisites
* Node.js (v18 or later)
* npm
* MongoDB (a local instance or a connection string from MongoDB Atlas)
* Access keys for Stripe & Cloudinary.
* (Optional) [Ollama](https://ollama.com/) running locally for the AI assistant.
