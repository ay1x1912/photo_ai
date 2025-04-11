import { prisma } from '@repo/db/prisma';
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
    const packs= await prisma.pack.findMany({})
    res.json({
       packs
    })
})

export default getRouter;
