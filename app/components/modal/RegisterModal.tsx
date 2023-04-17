"use client"

import useSWR from "swr"

// import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState,useId } from "react";

import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "@ui/Modal";
import Heading from "./Heading";
import Input from "@ui/Inputs/FormInputs";
import Button from "@ui/Button";
import axios from "axios"
import useLoginModal from "@/app/hooks/useLoginModal";
import { toast } from "react-hot-toast";

// import useLoginModal from "@/app/hooks/useLoginModal";



const RegisterModal = () => {

    const key = useId()
    const [loading, setLoading] = useState(false)
    const registerModal =  useRegisterModal()
    const loginModal  = useLoginModal()
    const {register, handleSubmit, formState : {errors }}  = useForm<FieldValues>({
        defaultValues : {
            name : "",
            email : "",
            password : ""
        }
    })


 interface FormData  {
    name : string,
    email : string, 
    password : string | number,

 }
 const onSubmit: SubmitHandler<FieldValues> = async (data) => {

  setLoading(true)

  axios.post('/api/register', data)
  .then(() => {
    toast.success('Registered!');
    registerModal.onClose();
    loginModal.onOpen();
  })
  .catch((error) => {
    toast.error(error);
  })
  .finally(() => {
    setLoading(false);
  })


  };


  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Airbnb"
        subtitle="Create an account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
     intent="outline"
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}} 
      />
    
      <div 
        className="mt-4 font-light text-center text-neutral-500"
      >
        <p className  = "font-medium text-md">Already have an account?
          <span 
            onClick={loginModal.onOpen} 
            className="cursor-pointer hover:underline text-brand"
            > Log in</span>
        </p>
      </div>
    </div>
  )



  return (
    <Modal key = {key}  isOpen={registerModal.isOpen} 
    isSubmitting =  {loading}
    disabled =  {loading}
    onClose =  {registerModal.onClose} 
    onSubmit={handleSubmit(onSubmit)}
    actionLabel = "Continue"
    body={bodyContent}
    title = "Register"
    footer={footerContent}
    />
  )
  }


        export default RegisterModal