import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from './routes/userRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
import {dbConnection} from './database/dbConnections.js';
import {ErrorHandler, errorMiddleware} from './middlewares/error.js';

const app = express();
dotenv.config({path: "./config/config.env"});

app.use(cors({
    origin: [process.env.Frontend_Url],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
})
);

app.use(cookieParser());   //it's imp for authorization of user
app.use(express.json());   //takes only json data neglates other type of data
app.use(express.urlencoded({extended: true}));    // user passes string it convert into json format

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:"/tmp/",
}));


app.use('/api/v1/user', userRouter);
app.use('/api/v1/application', applicationRouter);
app.use('/api/v1/job', jobRouter);

dbConnection();

app.use(errorMiddleware);


export default app;