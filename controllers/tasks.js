const Task = require("../models/tasks")
const asyncWrapper = require("../middleware/async")
const { createCustomError } = require("../errors/custom-errors")

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
    const { id:taksID } = req.params;
    const task = await Task.findOne({ _id: taksID })
    if (!task) {
        return next(createCustomError(`No task with id : ${taksID}`, 404))
    }
    res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id:taksID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taksID })
    if (!task) {
        return next(createCustomError(`No task with id : ${taksID}`, 404))
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res, next) => {
    const { id:taksID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taksID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(createCustomError(`No task with id : ${taksID}`, 404))
    }
    res.status(200).json({ id:taksID, data:req.body })
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};