const Task = require("../models/tasks")

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getTask = async (req, res) => {
    try {
        const { id:taksID } = req.params;
        const task = await Task.findOne({ _id: taksID })
        if (!task) {
            return res.status(404).json({ msg: `No task with id : ${taksID}` })
        }
        res.json({ task })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id:taksID } = req.params;
        const task = await Task.findOne({ _id: taksID })
        if (!task) {
            return res.status(404).json({ msg: `No task with id : ${taksID}` })
        }
        res.json({ task })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id:taksID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taksID })
        if (!task) {
            return res.status(404).json({ msg: `No task with id : ${taksID}` })
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};