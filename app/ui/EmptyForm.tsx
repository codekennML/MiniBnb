
"use client"

import React from "react"
import Heading from "../components/modal/Heading"
import Button from "./Button"
import { useRouter} from "next/navigation"


interface EmptyFormProps {
    showReset : boolean
    title : string
    subtitle : string
}
const defaultTitle  =  "No matching Listings were found" 
const defaultSubtitle  =  "Please check back later"
const EmptyForm: React.FC<EmptyFormProps> = ({title = defaultTitle , subtitle =  defaultSubtitle, showReset} ) => {

    const router =  useRouter() 

    return (
 
    <div className=" h-[60vh] flex flex-col  gap-2 justify-center items-center 
      ">
      <Heading title = {title} subtitle={subtitle} />
   {  
   
   showReset && 
    <Button label="Reset" disabled = {false} intent={`outline`} fullWidth = {false} onClick={() => {router.push("/")}} />
   }  


    </div>
  )
}

export default EmptyForm