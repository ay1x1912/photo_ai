import express from 'express'
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// CloudFlare R2
if(!process.env.ACCESSKEYID){
  console.log("hello world")
}
const r2 = new S3Client({
  endpoint: "https://7341f17eb0a6dab11d842eae33efac22.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: "4ef99742db29c582e53d201f8547bd78",
    secretAccessKey: "104e1d7f383583b7593138a29bbb0e102aafc4eb153580f81ff412b32768c072",
  },
  region: "auto",
});
const presignRouter=express.Router()

 presignRouter.get('/', async(req,res)=>{

    const key=`model/${Date.now()}_${Math.random()}.zip`
    const url = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket:"photoaibucket" ,
        Key:key,
      }),
      {
        expiresIn: 60 * 60 * 24 * 7, // 7d
      },
    );

    
    
    res.json({
        url,
        key
    })
})

export default presignRouter