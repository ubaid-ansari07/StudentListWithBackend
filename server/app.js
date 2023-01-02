import bodyParser from "body-parser";
import express  from "express";
import mongoose from "mongoose";
import cors from 'cors'
import userRouter from './routes/userRouter.js'
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://ubaid_mern:izzaLbqGOr1Ze5D3@cluster0.ejtuxti.mongodb.net/testdb?retryWrites=true&w=majority',err=>{
    if(err)
        console.log(err);
    else
        {
            console.log('Connected to database...');
            app.use('/',userRouter)
           app.listen(8000,()=>{console.log('server started... ');})
        }
})