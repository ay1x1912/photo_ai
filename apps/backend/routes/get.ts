import { auth } from '@repo/common/auth';
import { prisma } from '@repo/db/prisma';
import { fromNodeHeaders } from 'better-auth/node';
import express from 'express'
const getRouter=express.Router();

getRouter.get('/image/bulk', async(req,res)=>{
    const id=req.query.images as string[]
    
    const skip=req.query.skip as string || "0"
    const take=req.query.take as string || "10"
    const imagesData= await prisma.outputImage.findMany({
        where:{
            id:{in:id},
            userId:"hello"
        },
        skip:parseInt(skip),
        take:parseInt(take)
    })
    res.json({
       images:imagesData
    })
})
getRouter.get('/pack/bulk',async(req,res)=>{
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
    // const packs= await prisma.pack.findMany({})
    res.json({
       session
    })
})

 
export default getRouter;
