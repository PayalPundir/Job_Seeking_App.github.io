import express from 'express';
import {getAlljobs,getMyJobs,postJob, updateJob, deleteJob} from '../controllers/jobController.js';
import { isAuthorized } from '../middlewares/auth.js';
const router = express.Router();

router.get('/getAll', getAlljobs);
router.post('/post', isAuthorized,postJob);
router.get("/getmyjobs", isAuthorized, getMyJobs);
router.get("/update/:id", isAuthorized, updateJob);
router.delete("/delete/:id", isAuthorized, deleteJob);


export default router;