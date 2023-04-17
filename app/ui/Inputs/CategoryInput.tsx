"use client"
import { IconType } from "react-icons"


interface CategoryInputProps {
    icon : IconType,
    selected? : boolean ,
    label : string, 
    onClick : (value : string) => void

}


const CategoryInput : React.FC<CategoryInputProps > = ({
    icon: Icon , selected, label,  onClick
}) => {
  return (
    <div className={` flex flex-col  gap-3 p-4 mx-3 transition border border-gray-700 cursor-pointer  rounded-xl ${selected ? "border-brand"  : "border-neutral-200"}
  `}


     onClick =  {() => onClick(label)}>
        <Icon size ={30} />
        <div className =  "font-semibold"> {label} </div>
     </div>
  )
}

export default CategoryInput