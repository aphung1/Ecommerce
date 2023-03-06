import User from "../models/user.js";

const authController = {};

const handleErrors = (err) => {
    let error = {email: "", password: ""}

    // Checks if email uniqueness requirement is met
    // If not, it will send an error code
    if (err.code === 11000) {
        error.email = "An account currently exists for this email"
        return error
    }

    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            error[properties.path] = properties.message
        })
    }
    return error
}

authController.handleLogIn = async(req, res)=> {
    const {email, password } = req.body;

    const user = await User.create({ email, password})
        .catch((err) => {
            return res.send(handleErrors(err));
        });
    return res.send(`${user} Logged In!`);
}

authController.handleSignUp = async (req, res)=> {
    const {email, password } = req.body;

    try {
        const user = await User.create({ email, password});
        res.status(201).json(user);
    } catch (err) {
        res.status(400).send(handleErrors(err))
    }
}

export default authController;