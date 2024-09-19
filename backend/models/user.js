import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide your name!"],
        minLength: [3, "atleast 3 characters!"],
        maxLength:[30, "atmost 30 character"]
    },
    email:{
        type:String,
        required: [true, "Please provide your email!"],
        validate: [validator.isEmail, "Please provide a vaild email!"]
    },
    phone:{
        type:Number,
        required: [true, "Please provide your phone number."]
    },
    password:{
        type:String,
        required:[true,"Please provide your password!"],
        minLength:[8,"Atleast 8 character!"],
        maxLength:[32, "Atmost 32 character!"]
    },
    role:{
        type:String,
        required:[true,"Please provide your role"],
        enum:["Job Seeker", "Employer"],
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


//hashing a password

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//comparing password

userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};

//generating a jwt token for authorization

userSchema.methods.getJWTToken = function (){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE});
};

export const User = mongoose.model("User", userSchema);