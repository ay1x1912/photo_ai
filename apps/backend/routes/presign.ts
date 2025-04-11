import express from 'express'
import { S3Client } from "bun";
import { isAssertsKeyword } from 'typescript';

// CloudFlare R2
const r2 = new S3Client({
  accessKeyId: "access-key",
  secretAccessKey: "secret-key",
  bucket: "my-bucket",
 
});
const presignRouter=express.Router()

 presignRouter.get('/',(req,res)=>{

    const credentials = {
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey:process.env.SECRETACCESSKEY,
      bucket: process.env.BUCKET,
      endpoint: "https://7341f17eb0a6dab11d842eae33efac22.r2.cloudflarestorage.com/photoaibucket",
    };
    const key=`model/${Date.now()}_${Math.random()}.zip`
    const url = r2.presign(key, {
      ...credentials,
      expiresIn: 3600,
    });
    res.json({
        url,
        isAssertsKeyword
    })
})

export default presignRouter