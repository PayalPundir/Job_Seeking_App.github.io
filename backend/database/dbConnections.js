import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL,{
        dbName: "Job_Seeking_App",
    })
    .then(() => {
        console.log("Connected to database!");
    })
    .catch((err) => {
        console.log("something error....!");
    });
};