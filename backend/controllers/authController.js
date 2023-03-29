import User from "../models/user.js";
import jwt from "jsonwebtoken";


const authController = {};
const maxAge = 60 * 60 * 24 * 3     // 3 days

const handleErrors = (err) => {
    let error = {email: "", password: ""}

    if (err.message.includes("Incorrect email")) {
        error["email"] = "That email is not registered"
    }

    if (err.message.includes("Incorrect password")) {
        error["password"] = "That password is incorrect"
    }


    // Checks if email uniqueness requirement is met
    // If not, it will send an error code
    if (err.code === 11000) {
        error.email = "An account currently exists for this email"
        return { error }
    }

    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            error[properties.path] = properties.message
        })
    }
    return { error }
}

const createToken = (id, age) => {
    return jwt.sign({id}, "my own secret not very secret", {expiresIn: age});
}

authController.handleLogIn = async (req, res)=> {
    const {email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const accessToken = createToken(user._id, '30s')
        const refreshToken = createToken(user._id, '3d');
        user.refreshToken = refreshToken;
        const savedUser = await user.save();
        console.log(savedUser)
        res.cookie("jwt", refreshToken, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({ id: user._id, accessToken })
    } catch (err) {
        console.log(err.message);
        res.status(400).json(handleErrors(err))
    }
}

authController.handleSignUp = async (req, res)=> {
    const {email, password } = req.body;

    try {
        const user = await User.create({ email, password});
        const accessToken = createToken(user._id, '30s')
        const refreshToken = createToken(user._id, '3d');
        user.refreshToken = refreshToken;
        const savedUser = await user.save();
        console.log(savedUser)
        res.cookie("jwt", refreshToken, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({ id: user._id, accessToken });
    } catch (err) {
        console.log(err.message);
        res.status(400).json(handleErrors(err));
    }
}

authController.refreshAccessToken = async (req, res)=> {
    const cookies = req.cookies;
    
    // Check if the user has a refresh token in their cookies
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;
    const user = await User.findOne({refreshToken});
    if (!user) {
        return res.sendStatus(403);     // Send 403 if refresh token doesn't match any user
    }
    jwt.verify(refreshToken, "my own secret not very secret", (err, decoded) => {
        if (err || user._id !== decoded.id) {
            res.sendStatus(403);
        }
        // Create a new access token for the user after passing all the checks
        const accessToken = createToken(user._id, '30s')
        res.status(201).json({ id: user._id, accessToken })
    })
}

export default authController;