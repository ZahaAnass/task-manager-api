const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found")
const errorHandler = require("./middleware/error-handler")
require("dotenv").config();

// middleware
    // static files
    app.use(express.static("./public"));
    // parse json
    app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks)
app.use(notFound);
app.use(errorHandler);

// app.get("/api/v1/tasks")             - get all the tasks
// app.post("/api/v1/tasks")            - create a new task
// app.get("/api/v1/tasks/:id")         - get single task 
// app.patch("/api/v1/tasks/:id")       - update task 
// app.delete("/api/v1/tasks/:id")      - delete task

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}...`)
        });
    } catch (error) {
        console.log(error);
    }
}

start();