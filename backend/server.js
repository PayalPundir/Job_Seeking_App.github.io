import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({   //import info from config.env
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,    //name 
    api_key: process.env.ClOUDINARY_CLIENT_API,         //api from cloudinary website
    api_secret: process.env.ClOUDINARY_CLIENT_SECRET,
});

app.listen(process.env.PORT, () => {  // import port no. from config.js
    console.log(`Server running on port ${process.env.PORT}`)
});