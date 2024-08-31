"use client";
import { useState } from "react";
import { EyeIcon, EyeOff, X } from "lucide-react";

// Import UI components
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Form } from "../components/ui/form";
import { cn } from "@/lib/utils";

// Import form handling and Redux hooks
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, updateModalState } from "@/redux/slices/ModalSlice";

// Import custom input component
import FormInput from "../components/input/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/validation/auth";

const SignUpCredentials = () => {
  // State to manage password and confirm password visibility
  const [passwordVisibile, setPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  // Access the auth dialog state from the Redux store
  const authDialogState = useSelector((state) => state.ModalSlice);

  // Redux dispatch function to dispatch actions
  const dispatch = useDispatch();

  // Initialize the form with default values
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <AlertDialog
      open={authDialogState.openSignUpCredentialsModal}
      onOpenChange={() => {
        dispatch(closeModal("openSignUpCredentialsModal"));
        form.reset();
      }}
    >
      <AlertDialogContent
        className={cn(
          "w-11/12 max-w-96 gap-2 rounded-xl border-none bg-slate-gray sm:max-w-[28rem] xl:max-w-[32rem] xl:gap-3 3xl:max-w-[35rem] 4xl:gap-4",
        )}
      >
        <div className="flex items-center justify-between">
          {/* Dialog title */}
          <AlertDialogTitle className="text-xl text-white 2xl:text-2xl 4xl:text-3xl">
            Sign Up
          </AlertDialogTitle>
          {/* Close button */}
          <AlertDialogCancel
            className={cn(
              "mt-0 max-w-min justify-end border-none bg-slate-gray p-0 !text-white hover:bg-transparent",
            )}
          >
            <X />
          </AlertDialogCancel>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Username input */}
            <div className="mt-4 lg:mt-5 2xl:mt-5 4xl:mt-6">
              <FormInput
                control={form.control}
                name="username"
                placeholder="Username"
              />
            </div>
            {/* Password input with visibility toggle */}
            <div className="relative mt-4 lg:mt-5 2xl:mt-5 4xl:mt-6">
              <FormInput
                type={passwordVisibile.password ? "text" : "password"}
                control={form.control}
                name="password"
                placeholder="Password"
              />
              <div
                onClick={() =>
                  setPasswordVisible({
                    ...passwordVisibile,
                    password: !passwordVisibile.password,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#a1a1aa]"
              >
                {passwordVisibile.password ? <EyeIcon /> : <EyeOff />}
              </div>
            </div>
            {/* Confirm password input with visibility toggle */}
            <div className="relative mt-4 lg:mt-5 2xl:mt-5 4xl:mt-6">
              <FormInput
                type={passwordVisibile.confirmPassword ? "text" : "password"}
                control={form.control}
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <div
                onClick={() =>
                  setPasswordVisible({
                    ...passwordVisibile,
                    confirmPassword: !passwordVisibile.confirmPassword,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#a1a1aa]"
              >
                {passwordVisibile.confirmPassword ? <EyeIcon /> : <EyeOff />}
              </div>
            </div>
            {/* Submit button */}
            <button className="mt-5 w-full rounded-full bg-shiny-blue p-3 text-sm font-semibold text-dark-slate hover:bg-[#21ffdb] md:mt-6 md:text-base xl:mt-7 3xl:mt-8 3xl:text-lg">
              Create Account
            </button>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignUpCredentials;
