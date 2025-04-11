import express, { json } from 'express'
const generateRouter=express.Router();
import {GenerateImageFromPack,GenerateImageFromPrompt} from '@repo/common/types'
import { prisma } from '@repo/db/prisma';
import { FalAiModel } from '../models/falAiModel';
import { string } from 'zod';

const falModel=new FalAiModel()
generateRouter.post('/ai/generate',async(req,res)=>{
  try{
    const parseBody=GenerateImageFromPrompt.safeParse(req.body);
    if(!parseBody.success){
        res.status(411).json({msg:'Incorret Input'})
        return
    }
   
    const {modelId,num,prompt }=parseBody.data
    const model=await prisma.model.findUnique({
      where:{
        id:modelId
      }
    })
    if(!model|| !model.tensorPath){
      res.status(411).json({
        msg:"model not foun"
      })
      return
    }
    const request_id = await falModel.generateImages(prompt,model?.tensorPath)
 if(!request_id){
    throw new Error("Fal ai api called failed");
    
 }
    const data=await prisma.outputImage.create({
        data:{
            modelId,
            prompt, 
            imageUrl:"",
            userId:"hello",
            falAiRequest_id:request_id
        }
    })
    res.status(200).json({imageId:data.id})
 
  }catch(error){
    console.log('Error occured whiel generating image from pormpt',error)
    res.status(500).json({msg:'Internal server error'})
  }
})




generateRouter.post('/pack/generate',async(req,res)=>{
  try{
    const parseBody=GenerateImageFromPack.safeParse(req.body);
    if(!parseBody.success){
        res.status(411).json({msg:"Incorrect Input"})
        return 
    }
    const {modelId,packId}=parseBody.data
    const prompts=await prisma.packPrompts.findMany({
        where:{
            packId
        }
    })
    const model=await prisma.model.findUnique({
      where:{
        id:modelId
      }
    })
    if(!model || !model.tensorPath ){
       res.status(411).json({
        msg:"model not foun"
      })
    return
    }
    const imageData = await Promise.all(
      prompts.map(async (prompt) => {
        const request_id = await falModel.generateImages(prompt.prompt, model.tensorPath!);
        if (!request_id) {
          throw new Error('Fal AI API call failed');
        }

        return {
          modelId,
          prompt: prompt.prompt,
          imageUrl: '',
          userId: 'hello',
          falAiRequest_id: request_id
        };
      })
    );
    const images= await prisma.outputImage.createManyAndReturn({
      data:imageData
    })
    res.status(200).json({images:images.map((image)=>image.id)})
  }catch(error){
    console.log('Error while genrating pack images',error)
    res.status(500).json({msg:"Internal server error"})
  }
 
})

export default generateRouter
