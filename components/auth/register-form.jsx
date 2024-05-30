"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useIsClient } from "@/hooks/use-is-client";
import Spinner from "../spinner";
import { RegisterSchema } from "@/schemas";
import CardWrapper from "./card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "../ui/form";
import { Input } from "../ui/input";
import { PasswordInput } from "../password-input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { register } from "@/actions/register";
const RegisterForm = () => {
    const isClient = useIsClient();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition();
    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        },
    });
    const onSubmit = (values) => {
        startTransition(() => {
            register(values).then((data) => {
                if (data.success)
                    setSuccess(data.success);
                if (data?.error)
                    setError(data.error);
            });
        });
        form.reset();
        setSuccess("");
        setError("");
    };
    if (!isClient)
        return <Spinner />;
    return (<CardWrapper headerLabel="Зарегистрируйте учетную запись, чтобы начать работу!" backButtonLabel="У вас уже есть учетная запись?" backButtonHref="/auth/login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (<FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} type="text" placeholder="Ваше имя"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>)}/>

            <FormField control={form.control} name="email" render={({ field }) => (<FormItem>
                  <FormLabel>Почтовый адрес</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} type="email" placeholder="your.email@example.com"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>)}/>

            <FormField control={form.control} name="password" render={({ field }) => (<FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} disabled={isPending} type="password" placeholder="******"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>)}/>

            <FormField control={form.control} name="passwordConfirmation" render={({ field }) => (<FormItem>
                  <FormLabel>Подтвердите пароль</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} disabled={isPending} type="password" placeholder="******"/>
                  </FormControl>
                  <FormMessage />
                  <Button size="sm" variant="link" asChild className="px-0 text-muted-foreground">
                    <Link href="/auth/reset">Забыли пароль?</Link>
                  </Button>
                </FormItem>)}/>
          </div>
          {error && <FormError message={error}/>}
          {success && <FormSuccess message={success}/>}
          <Button type="submit" disabled={isPending} className="w-full hover:bg-sky-400">
            Регистрация
          </Button>
        </form>
      </Form>
    </CardWrapper>);
};
export default RegisterForm;
