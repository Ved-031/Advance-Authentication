"use client";

import * as z from 'zod';

import { useState, useTransition } from 'react';

import { CardWrapper } from "./card-wrapper";

import { useForm } from "react-hook-form";
import { RegisterSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';


import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { 
    Form, 
    FormControl,
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "../ui/form";
import { register } from '@/actions/register';
import { BeatLoader } from 'react-spinners';


export const RegisterForm = () => {

    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const submitHandler = (values: z.infer<typeof RegisterSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            register(values)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            })
        })
    }

    return (
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(submitHandler)} 
                    className='space-y-6'
                >
                    <div className='space-y-4'>
                        <FormField 
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            placeholder='John Doe'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            type='email'
                                            placeholder='johndoe@example.com'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            type='password'
                                            autoComplete='false'
                                            placeholder='******'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type='submit'
                        disabled={isPending}
                        className='w-full'
                    >
                        {
                            isPending ? <BeatLoader /> : "Register"
                        }
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}