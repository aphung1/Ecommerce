import User from "../models/user.js";

const authController = {};

authController.handleLogIn = async(req, res)=> {
    const {email, password } = req.body;

    const user = await User.create({ email, password})
        .catch((err) => {
            return res.send(err);
        });
    return res.send(`${user} Logged In!`);
}

authController.handleSignUp = async (req, res)=> {
    const {email, password } = req.body;

    try {
        const user = await User.create({ email, password});
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(400).send('error')
    }
}

export default authController;