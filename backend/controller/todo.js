const mongoose = require('mongoose');
const Task=require('../models/task');
const User=require('../models/user');



exports.getAllTask=async(req,res,next)=>{
    const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({ status: 'Failed', message: 'User not authenticated' });
        }

        const user = await User.findById(userId).populate('tasks');
        if (!user) {
            return res.status(404).json({ status: 'Failed', message: 'User not found' });
        }

        res.status(200).json({
            status: 'Success',
            totalTasks: user.tasks.length,
            data: {
                tasks: user.tasks
            }
        });
    }
exports.creatTask = async (req, res, next) => {
    try {
        const {task}=req.body
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ status: 'Failed', message: 'User not authenticated' });
        }
        const newTask = await Task.create({
            userId: req.user.userId,
            task
        });
        

        await User.findByIdAndUpdate (
            req.user.userId,
            {$push:{tasks:newTask.id}}
        )
        res.status(201).json({
            status: "Success",
            data: {
                newTask
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        });
    }
};


exports.updateTask = async (req, res, next) => {
    try {
        const taskId = req.params.id; 
        const { task, completed } = req.body;
        const userId = req.user.userId; 

        if (!userId) {
            return res.status(401).json({ status: 'Failed', message: 'User not authenticated' });
        }

      
        // if (!mongoose.Types.ObjectId.isValid(taskId)) {
        //     return res.status(400).json({ status: 'Failed', message: 'Invalid task ID' });
        // }

        // Update the task
        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, userId }, 
            { task, completed },
            { new: true } 
        );

        if (!updatedTask) {
            return res.status(404).json({ status: 'Failed', message: 'Task not found' });
        }

        res.status(200).json({
            status: "Success",
            data: {
                updatedTask
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.id; 
        const userId = req.user.userId; 

        if (!userId) {
            return res.status(401).json({ status: 'Failed', message: 'User not authenticated' });
        }

        // Validate if ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ status: 'Failed', message: 'Invalid task ID' });
        }

        // Find and delete the task
        const deletedTask = await Task.findOneAndDelete({
            _id: taskId,
            userId
        });

        if (!deletedTask) {
            return res.status(404).json({ status: 'Failed', message: 'Task not found' });
        }

        // Remove the task from the user's task list
        await User.findByIdAndUpdate(
            userId,
            { $pull: { tasks: taskId } },
            { new: true }
        );

        res.status(200).json({
            status: "Success",
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        });
    }
};
