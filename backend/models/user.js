const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
});

userSchema.pre('save',async function(next){
     // Only run this function if password was actually modified
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();

});

// userSchema.method.matchPassword=async function (password){
//     return await bcrypt.compare(password,this.password);
// };

userSchema.methods.matchPassword = async function (Password) {
    return await bcrypt.compare(Password, this.password);
};

const User=mongoose.model('User',userSchema);
module.exports=User;