
import userModel from "../model/user.model.js";
import imagekit from "../config/imagekit.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {generateTokens} from '../utils/TokenGeration.utils.js'
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
};



export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required",
            });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        let profileUrl = "";

        if (req.file?.buffer) {
            const image = await imagekit.upload({
                file: req.file.buffer,
                fileName: req.file.originalname,
                folder: "profile",
            });

            profileUrl = image.url;
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hash,
            profile: profileUrl,
        });

        const { accessToken, refreshToken } = generateTokens(user._id);

  

        res.cookie("refreshtoken", refreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profile: user.profile,
            },
            accessToken
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const { accessToken, refreshToken } = generateTokens(user._id);

   
        res.cookie("refreshtoken", refreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profile: user.profile,
            },
            accessToken
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
