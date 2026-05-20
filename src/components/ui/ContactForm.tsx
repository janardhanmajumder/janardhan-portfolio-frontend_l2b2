"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Input as MTInput,
  Textarea as MTTextarea,
  Button as MTButton,
} from "@material-tailwind/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LuSend } from "react-icons/lu";
import { toast } from "sonner";
import { sendEmail } from "@/services/actions/sendEmail";

// Cast to any to avoid strict material-tailwind prop type conflicts in TSX
const Input = MTInput as any;
const Textarea = MTTextarea as any;
const Button = MTButton as any;

const FormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(5),
  message: z.string().min(5),
});

const ContactForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const toastId = toast.loading("Sending Message....");
    try {
      const { data, error } = await sendEmail(formData);
      if (data) {
        form.reset();
        toast.success("Successfully sent message. Thanks!", {
          id: toastId,
          duration: 2000,
        });
      } else if (error) {
        toast.error("Something went wrong!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error("Something went wrong!", {
        id: toastId,
        duration: 2000,
      });
    }
  }

  const inputStyles = {
    input: "!text-white !border-zinc-700 focus:!border-violet-500 !bg-zinc-900/40 placeholder-shown:!border-zinc-700",
    label: "!text-zinc-400 peer-focus:!text-violet-400",
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  label="Name"
                  color="purple"
                  variant="outlined"
                  classNames={inputStyles}
                  data-aos="fade-left"
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs mt-1" />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  label="Email"
                  type="email"
                  color="purple"
                  variant="outlined"
                  classNames={inputStyles}
                  data-aos="fade-left"
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs mt-1" />
            </FormItem>
          )}
        />

        {/* Subject */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  label="Subject"
                  color="purple"
                  variant="outlined"
                  classNames={inputStyles}
                  data-aos="fade-left"
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs mt-1" />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  label="Message"
                  rows={4}
                  color="purple"
                  variant="outlined"
                  classNames={inputStyles}
                  data-aos="fade-left"
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs mt-1" />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          fullWidth
          variant="gradient"
          color="purple"
          className="flex justify-center items-center gap-2 py-3.5 rounded-full font-heading font-semibold tracking-wide shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all duration-300"
          data-aos="fade-left"
        >
          <LuSend size={16} />
          <span>Send Message</span>
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
