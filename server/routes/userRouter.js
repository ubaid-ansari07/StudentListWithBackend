import express from 'express';
import { add, show ,remove, filByBranch,updateShow,update} from '../controller/userController.js';
const router=express.Router();

router.get('/',show)
router.post('/add',add)
router.get('/delete/:roll',remove)
router.get('/filter/:branch',filByBranch)
router.get('/updateshow/:id',updateShow)
router.post('/updateshow',update)
export default router