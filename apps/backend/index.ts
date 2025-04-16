import express from 'express'
import trainRouter from './routes/train'
import generateRouter from './routes/generate'
import getRouter from './routes/get'
import webhookRouter  from './routes/webhooks'
import presignRouter from './routes/presign'
import cors from "cors"
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import auth  from "./lib/auth";
import type { request } from 'express'
 

 
const app=express()
app.all("/api/auth/*", toNodeHandler(auth));
app.use(
  cors({
    origin: "http://localhost:3000/", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(express.json())
app.use(getRouter,trainRouter,generateRouter);
app.use("fal_ai/webhook",webhookRouter);
app.use('/presign_url',presignRouter)






app.listen(8080,()=>{
    console.log('listening on port 8080')
})