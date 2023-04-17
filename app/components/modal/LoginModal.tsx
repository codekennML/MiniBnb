"use client";

import { FcGoogle } from "react-icons/fc";
import { useCallback, useState, useId, FormEvent } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "@ui/Modal";
import Heading from "./Heading";
import Input from "@ui/Inputs/FormInputs";
import Button from "@ui/Button";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const key = useId();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  interface FormData {
    name: string;
    email: string;
    password: string | number;
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);

    try {
      const callback = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      console.log(callback);
      setIsLoading(false);

      if (callback?.ok) {
        console.log("Success");
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error("An error occurred while logging in.");
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back" subtitle="Login to your account" />

      <Input
        id="email"
        label="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button
        intent="outline"
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />

      <div className="mt-4 text-center font-light text-neutral-500">
        <p className="text-md font-medium">
          {" "}
          Create an account?
          <span
            onClick={loginModal.onClose}
            className="cursor-pointer text-brand hover:underline"
          >
            {" "}
            Sign up{" "}
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      key={key}
      isSubmitting={isLoading}
      isOpen={loginModal.isOpen}
      disabled={isLoading}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Continue"
      body={bodyContent}
      title="Login"
      footer={footerContent}
    />
  );
};

export default LoginModal;
