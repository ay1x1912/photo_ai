import express from 'express'
import trainRouter from './routes/train'
import generateRouter from './routes/generate'
import getRouter from './routes/get'
import webhookRouter  from './routes/webhooks'
import presignRouter from './routes/presign'
const app=express()

app.use(getRouter,trainRouter,generateRouter);
app.use("fal_ai/webhook",webhookRouter);
app.use('/presign_url',presignRouter)






app.listen(8080,()=>{
    console.log('listening on port 8080')
})