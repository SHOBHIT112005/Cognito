import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    name:{
        type:String,
        reqired:true
    },
    email:{
        type:String,
        reqired:true
    },
    password:{
        type:String,
        reqired:true
    },
    role:{
        type:String,
        enum:["instructor","student"],
        default:'student'
    },
    enrolledCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ],
    photoUrl:{
        type:String,
        default:""
    },

},{timestamps:true});

export const User = mongoose.model("User",userSchema);