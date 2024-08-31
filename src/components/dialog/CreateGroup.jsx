"use client";
import { X } from "lucide-react";
// Import UI components
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

// Import form handling and Redux hooks
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/slices/ModalSlice";

// Import custom input and login components
import FormInput from "@/components/input/FormInput";
import TextareaInput from "../input/TextareaInput";

import { CTAButton } from "..";
import { ScrollArea } from "../ui/scroll-area";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { createGroupSchema } from "@/validation/createGroup";

const CreateGroup = () => {
  // Access the auth dialog state from the Redux store
  const authDialogState = useSelector((state) => state.ModalSlice);

  // Redux dispatch function to dispatch actions
  const dispatch = useDispatch();
  // Initialize the form with default values

  const [isMaturedContent, setIsMaturedContent] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      text: "",
    },
    resolver: yupResolver(createGroupSchema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <AlertDialog
      open={authDialogState.openCreateGroupModal}
      onOpenChange={() => {
        dispatch(closeModal("openCreateGroupModal"));
        form.reset();
      }}
    >
      <AlertDialogContent
        className={cn(
          "w-11/12 gap-2 rounded-xl border-none bg-slate-gray sm:max-w-[32rem] xl:max-w-[40rem] xl:gap-3 2xl:max-w-[45rem] 4xl:gap-4",
        )}
      >
        <ScrollArea className="max-h-[80vh] p-0">
          <div className="flex items-center justify-between">
            {/* Dialog title */}
            <AlertDialogTitle className="text-xl text-white 2xl:text-2xl">
              Create Group
            </AlertDialogTitle>
            {/*Dialog Close button */}
            <AlertDialogCancel
              className={cn(
                "mt-0 max-w-min justify-end border-none bg-slate-gray p-0 !text-white hover:bg-transparent",
              )}
            >
              <X />
            </AlertDialogCancel>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 flex flex-col gap-4 xl:gap-6"
            >
              <FormInput
                control={form.control}
                name="title"
                placeholder="Title"
              />
              <TextareaInput control={form.control} name="text" />

              <div className="flex items-center justify-end gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms1"
                    className={`border-white text-white ${isMaturedContent ? "!bg-white !text-dark-slate" : ""}`}
                    checked={isMaturedContent}
                    onCheckedChange={(checked) => {
                      setIsMaturedContent(checked);
                    }}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none text-white md:text-base"
                    >
                      Matured Content
                    </label>
                  </div>
                </div>
                <CTAButton>Create Group</CTAButton>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateGroup;
