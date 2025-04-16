import {z} from 'zod'


export const TrainModel=z.object({
    name:z.string(),
    type:z.enum(['Man','Women','Other']),
    age:z.number(),
    ethnicity:z.enum(['White','Black','Asian_American','East_Asian','South_East_Asian','South_Asian','Middle_East','Pacific','Hispanic']),
     eyeColor:z.enum(['Brown','Blue','Hazel_Green','Gray']),
     zipUrl:z.string()

})

export const GenerateImageFromPrompt=z.object({
    prompt:z.string(),
    modelId:z.string(),
    num:z.number()
})

export const GenerateImageFromPack=z.object({
    modelId:z.string(),
    packId:z.string()
})