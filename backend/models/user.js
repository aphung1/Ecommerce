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
    },
    refreshToken: {type: String}
});


userSchema.pre('save', async function (next) {
    if (this.isNew){
        console.log("I am encyrpting it again")
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt)
    }
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.find({ email })
    if (user[0]) {
        const match = await bcrypt.compare(password, user[0].password);
        if (match) {
            return user[0]
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect email')
}

const User = mongoose.model('User', userSchema);

export default User;
