export const sendToken = (user, statusCode, res, message) => {
    const token = user.getJWTToken();

    // Ensure COOKIE_EXPIRE is a number
    const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE, 10);

    // Correct the usage of Date.now() and ensure proper calculation of expiration
    const options = {
        expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    res.status(statusCode)
       .cookie("token", token, options)
       .json({
           success: true,
           user,
           message,
           token
       });
};
