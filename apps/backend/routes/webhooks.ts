import { prisma } from "@repo/db/prisma";
import  express, { Router }  from "express";

const webhookRouter=Router();

webhookRouter.use(express.json())

webhookRouter.post('/generate', async(req,res)=>{
  const {request_id,status}=req.body;
 if(status=="OK"){
    await  prisma.outputImage.updateMany({
        where:{
            falAiRequest_id:request_id },
        data:{
            status:"Success",
            imageUrl:req.body.paylodad.images.url
            

        }
    })
    res.json({
        msg:"Generated successfuly"
    })
 }
 if(status=="ERROR"){
    await  prisma.model.updateMany ({
        where:{
            falAiRequest_id:request_id  },
        data:{
            status:"Failed",
            
        }

 })
 res.json({
    error:req.body.paylodad.detail.msg
 })
}
    

 
})

webhookRouter.post('/train', async (req,res)=>{
const {status ,request_id ,tensorPath}=req.body
console.log(req.body);
    if(status=="OK"){
        await  prisma.model.updateMany({
            where:{
                falAiRequest_id:request_id },
            data:{
                status:"Success",
                tensorPath:tensorPath
    
            }
        })
        res.json({
            msg:"Trained successfuly"
        })
     }
     if(status=="ERROR"){
        await  prisma.model.updateMany ({
            where:{
                falAiRequest_id:request_id  },
            data:{ 
                status:"Failed",
                
            }
    
     })
     res.json({
        error:req.body.paylodad.detail.msg
     })
    }
                
}) 

export default webhookRouter