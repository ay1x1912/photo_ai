import React from 'react'
import { AiFillExclamationCircle } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
type FormErrorProps = {
    message?: string
}

const FormSuccess = ({message}: FormErrorProps) => {
    if (!message) return null
  return (
    <div className="bg-green-400 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
        <CiCircleCheck  className='w-4 h-4'/>
        {message}
    </div>
  )
}

export default FormSuccess