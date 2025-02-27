const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    task:{
        type:String,
        required:true
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    // tasks: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Task'
    // }]
});

const Task=mongoose.model('Task',taskSchema);

module.exports=Task;