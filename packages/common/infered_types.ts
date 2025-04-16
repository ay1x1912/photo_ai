import {TrainModel,GenerateImageFromPack,GenerateImageFromPrompt}from './types'
import {z} from 'zod'


export type TrainModelType=z.infer<typeof TrainModel>
export type GenerateImageFromPackType=z.infer<typeof GenerateImageFromPack>
export type GenerateImageFromPromptType=z.infer<typeof GenerateImageFromPrompt>
