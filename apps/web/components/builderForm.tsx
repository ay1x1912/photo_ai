"use client"
import {
  useState
} from "react"
import { toast } from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  Slider
} from "@/components/ui/slider"
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  CloudUpload,
  Paperclip
} from "lucide-react"
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from "@/components/ui/file-upload"
import axios from "axios"
import { BACKEND_URL, ZIP_URL } from "@/lib/config"
import JSZip from "jszip"

export type TrainFormState = {
  name: string;
  age: number;       // stored as string even if it's a number later
  gender: string;    // assuming you meant `type` from the original schema
  ethnicity: string;
  eyeColor: string;
  zipUrl: string;
};


export default function MyForm() {
const [values,setValues]=useState<TrainFormState>()

const [files, setFiles] = useState < File[] | null > (null);

  const formSchema = z.object({
    name: z.string().min(1),
   age: z.number(),
    gender: z.string(),
    ethnicity: z.string(),
    eyeColor: z.string(),
    fileInput:z.any()
  });
  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })
  async function callAi(callAiProps: TrainFormState): Promise<void> {
    const { name, age, gender, ethnicity, eyeColor, zipUrl } = callAiProps;
    
    try {
      // Basic validation (zod already handles this, but just in case)
      if (!name || !age || !gender || !ethnicity || !zipUrl) {
        throw new Error("Missing required input fields");
      }
  
      await axios.post(`${BACKEND_URL}/ai/train`, {
        name,
        age,
        type:gender,
        ethnicity,
        eyeColor,
        zipUrl,
      });
  
      console.log("AI training request sent successfully");
    } catch (error: any) {
      console.error("Error while calling the AI:", error?.response?.data || error.message || error);
    }
  }
  const handleClick = async () => {
    await callAi(values!);
  };

  async function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
    const formData=new FormData()
    const zip = new JSZip();
    const res= await axios.get(`${BACKEND_URL}/presign_url`);
    const preSignedurl=res.data.url;
    const key=res.data.key
    files!.forEach(file=>{
      const content=file.arrayBuffer();
      zip.file(file.name,content);
    });
   const content= await zip.generateAsync({type:"blob"})
   formData.append("file",content)
   formData.append("key",preSignedurl)
   const resFromR2= await axios.put(preSignedurl,formData)
     const zipUrl=`${ZIP_URL}/${key}`
     setValues(() => ({
      name: values.name,
      age: Number(values.age),// convert number to string
      gender: values.gender,
      ethnicity: values.ethnicity, // now the key matches
      eyeColor: values.eyeColor,
      zipUrl// ensure it's a string
    }));
    
      toast(
        <pre className="mt-2 w-[340px] rounded-md  p-4 bg-green-500">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                placeholder="ay1x"
                
                type=""
                {...field} />
              </FormControl>
              <FormDescription>This is the name of your model</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
            <FormField
              control={form.control}
              name="age"
              render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Age -{value}</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={[20]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>Adjust your age by sliding.</FormDescription>
                <FormMessage />
              </FormItem>
              )}
            />
        
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-col space-y-1"
                  >
                    {[
                      ["Male", "Man"],
                      ["Female", "Women"],
                      ["Other", "Other"]
                    ].map((option, index) => (
                      <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                        <FormControl>
                          <RadioGroupItem value={option[1]!} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option[0]}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormDescription>Select your gender</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        
        
        <FormField
          control={form.control}
          name="ethnicity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ethnicity</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="South_Asian" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                <SelectContent position="popper">
                  <SelectItem value="White">White</SelectItem>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="Asian_America">Asian America</SelectItem>
                  <SelectItem value="South_Asian">South Asian</SelectItem>
                  <SelectItem value="Pacific">Pacific</SelectItem>
                  <SelectItem value="Middle_East">Middle_East</SelectItem>
                  <SelectItem value="Hispanic">Hispanict</SelectItem>
                </SelectContent>
                </SelectContent>
              </Select>
                <FormDescription>Select your 
                ethnicity.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="eyeColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Eye Color</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Brown" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                 <SelectItem value="Brown">Brown</SelectItem>
                  <SelectItem value="Blue">Blue</SelectItem>
                  <SelectItem value="Hazel_Green">Hazel_Green</SelectItem>
                  <SelectItem value="Gray">Gray</SelectItem>
                </SelectContent>
              </Select>
                <FormDescription>Select your eye color</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
            <FormField
              control={form.control}
              name="fileInput"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select File</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={files}
                      onValueChange={setFiles}
                      dropzoneOptions={dropZoneConfig}
                      className="relative bg-background rounded-lg p-2"
                    >
                      <FileInput
                        id="fileInput"
                        className="outline-dashed outline-1 outline-slate-500"
                      >
                        <div className="flex items-center justify-center flex-col p-8 w-full ">
                          <CloudUpload className='text-gray-500 w-10 h-10' />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span>
                            &nbsp; or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                      </FileInput>
                      <FileUploaderContent>
                        {files &&
                          files.length > 0 &&
                          files.map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                              <Paperclip className="h-4 w-4 stroke-current" />
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </FileUploader>
                  </FormControl>
                  <FormDescription>Select a file to upload.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
        <Button type="submit">Upload Files</Button>
            
            </div>
           
      </form>
    </Form>
    <div>
      <Button onClickCapture={handleClick}>Train Mode</Button>
    </div>
    </div>

  )
}