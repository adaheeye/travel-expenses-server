import {runServer} from "./server.js";
import {} from 'dotenv/config'
import * as dotenv from "dotenv";
import mongoose from "mongoose";


const port = parseInt(process.env.PORT || 3000);
const mongoUri = process.env.MONGODB_URI;
dotenv.config();
mongoose.set('strictQuery', true);

runServer(port, mongoUri).catch(console.error);
