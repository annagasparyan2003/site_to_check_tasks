"use client";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas";
import CardWrapper from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { reset } from "@/actions/reset";
const ResetPasswordForm = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition();
    const form = useForm({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });
    const onSubmit = (values) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            reset(values).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };
    return (<CardWrapper headerLabel="Забыли пароль?" backButtonLabel="Вернуться назад" backButtonHref="/auth/login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField control={form.control} name="email" render={({ field }) => (<FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="your.email@example.com" type="email"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>)}/>
          </div>
          {error && <FormError message={error}/>}
          {success && <FormSuccess message={success}/>}
          <Button disabled={isPending} type="submit" className="w-full hover:bg-sky-400">
            Отправить email для сброса пароля
          </Button>
        </form>
      </Form>
    </CardWrapper>);
};
export default ResetPasswordForm;
