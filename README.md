# Task Manager API

A full-stack task management application built with Node.js, Express, MongoDB, and modern frontend technologies. This application allows users to create, read, update, and delete tasks with a clean, responsive interface featuring dark mode support.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete tasks
- **Modern UI**: Built with Tailwind CSS for a responsive and clean design
- **Dark Mode**: Toggle between light and dark themes
- **Real-time Updates**: Instant feedback on task operations
- **Error Handling**: Comprehensive error handling and user feedback
- **RESTful API**: Clean and consistent API endpoints

## 🛠️ Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API architecture
- JWT Authentication (optional)

### Frontend

- Vanilla JavaScript (ES6+)
- Tailwind CSS for styling
- Responsive design
- Dark mode support
- Font Awesome icons

### Development Tools

- Nodemon for development server
- Concurrently for running multiple commands
- PostCSS for CSS processing
- Git for version control

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-manager-api.git
   # or
   git clone git@github.com:ZahaAnass/task-manager-api.git
   cd task-manager-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. Build the CSS:

   ```bash
   npm run build:css
   ```

## 🚀 Running the Application

### Development Mode

```bash
# Start the development server
npm run dev:all
```

This will start both the backend server and the CSS watcher.

### Production Mode

```bash
# Build the CSS
npm run build:css

# Start the server
npm start
```

## 🌐 API Endpoints

| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| GET    | /api/v1/tasks     | Get all tasks              |
| POST   | /api/v1/tasks     | Create a new task          |
| GET    | /api/v1/tasks/:id | Get a single task          |
| PATCH  | /api/v1/tasks/:id | Update a task              |
| DELETE | /api/v1/tasks/:id | Delete a task              |

## 🎨 Frontend Structure

- `public/index.html` - Main application page
- `public/task.html` - Task edit page
- `public/browser-app.js` - Main frontend JavaScript
- `public/edit-task.js` - Task editing functionality
- `public/main.css` - Compiled Tailwind CSS
- `src/input.css` - Custom CSS with Tailwind directives

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)
- [Nodemon](https://nodemon.io/)
