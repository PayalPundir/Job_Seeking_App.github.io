import {catchAsyncError} from "./catchAsyncError.js";
import { ErrorHandler } from "./error.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.js";

export const isAuthorized = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("User not Authorized", 400));
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        return next(new ErrorHandler("Invalid Token", 401));
    }

    req.user = await User.findById(decoded.id);
    next();
});
