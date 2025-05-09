import express from 'express'
import { prisma } from '@repo/db/prisma';
import { TrainModel } from '@repo/common/types';
import { FalAiModel } from '../models/falAiModel';
const trainRouter=express.Router()
trainRouter.use(express.json())

const falModel=new FalAiModel()

trainRouter.post('/ai/train',async (req,res)=>{
 try{
    
const parseBody= TrainModel.safeParse(req.body) 
console.log(parseBody.error)
console.log(req.body)
 if(!parseBody.success){
    res.status(411).json({
        msg:"Incorrect Input"
    })
    return
 }
 
 const {name,age,type,eyeColor,ethnicity,zipUrl}=parseBody.data
//  const request_id = await falModel.trainModel(zipUrl,name)
const request_id="hellow rold"
 if(!request_id){
    throw new Error("Fal ai api called failed");
    
 }
const data=await prisma.model.create({
    data:{
        name,
        age,
        type,
        eyeColor,
       ethinicity:ethnicity,
        zipUrl,
        userId:"hello",
        falAiRequest_id:request_id
    }
})

res.status(200).json({
    modelId:data.id
})
}catch(error){
    console.log("Error creating model:",error)
    res.status(500).json({msg:"Internal server error"})
}



})
export default trainRouter;
