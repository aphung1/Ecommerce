import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    email : {
        type: String,
        required: [true, "Please put in an email"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please put in a password"],
        minlength: [6, "The password does not meet the minimum length requirements of 6 characters"]
    }
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

const User = mongoose.model('User', userSchema);

export default User;
