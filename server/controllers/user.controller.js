import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
export const register = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                success:false,
                message:"User already registered"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            name,
            email,
            password :hashedPassword
        })
        return res.status(201).json({
            success:true,
            message:"Successfully registered"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to register"
        })
    }
}

export const login = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const user = await User.findOne({email});
        const isPasswordMatch = bcrypt.compare(password, user.password);
        if(!user || !isPasswordMatch) {
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            })
        }
        generateToken(res,user,`Welcome back ${user.name}`);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }
}
export const logout = async (_,res) => {
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        })
    }
}
export const getUserProfile = async (req,res) => {
    try {
        const userID = req.id;
        const user = await User.findById(userID).select("-password").populate("enrolledCourses");
        if(!user) {
            return res.status(404).json({
                message:"User not found!",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Faild to load User!",
            success:false
        })
    }
}
export const updateProfile = async (req,res) => {
    try {
        const userID = req.id;
        const {name} = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userID);
        if(!user) {
            return res.status(404).json({
                message:"User not found!",
                success:false
            })
        }
        if(user.photoUrl){
            const publicID = user.photoUrl.split("/").pop().split(".")[0];
            deleteMediaFromCloudinary(publicID);
        }
        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updatedData = {name,photoUrl};
        const updatedUser = await User.findByIdAndUpdate(userID,updatedData,{new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Profile updated successfully!"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Faild to update profile!",
            success:false
        })
    }
}