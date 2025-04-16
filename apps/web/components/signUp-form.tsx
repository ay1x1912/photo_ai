"use client"
import React from 'react'
import CardWrapper from '@/components/card-wrapper'
import FormError from '@/components/form-error'
import  FormSuccess  from '@/components/form-success'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useAuthState } from '@/hooks/useAuthState'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SignupSchema } from '@/schemas/shemas'
import signInWithGoogle, { signIn, signUp } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { ErrorContext } from 'better-auth/react'

const SignUp = () => {
    const router = useRouter()
    const { error, success, loading, setLoading, setError, setSuccess, resetState } = useAuthState();

    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })
   const handleWithGoole=async () => {
    try {
        await signIn.social({
            provider: "google"
        }, {
            onResponse: () => {
                setLoading(false)
            },
            onRequest: () => {
                resetState()
                setLoading(true)
            },
            onSuccess: () => {
                setSuccess("User has been created")
                router.replace('/')
            },
            onError: (ctx: ErrorContext) => {
                setError(ctx.error.message);
            },
        });
    } catch (error) {
        console.error(error)
        setError("Something went wrong")
    }

}
    const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
        try {
            await signUp.email({
                name: values.name,
                email: values.email,
                password: values.password,
            }, {
                onResponse: () => {
                    setLoading(false)
                },
                onRequest: () => {
                    resetState()
                    setLoading(true)
                },
                onSuccess: () => {
                    setSuccess("User has been created")
                    router.replace('/')
                },
                onError: (ctx) => {
                    setError(ctx.error.message);
                },
            });
        } catch (error) {
            console.error(error)
            setError("Something went wrong")
        }

    }

    return (
        <CardWrapper
        cardTitle='SignUp'
        cardDescription='Create an new account'
        cardFooterLink='/login'
        cardFooterDescription='Already have an account?'
        cardFooterLinkTitle='Login'
        >
            <Form {...form}>
                <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        type="text"
                                        placeholder='john'
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        type="email"
                                        placeholder='example@gmail.com'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        type="password"
                                        placeholder='********'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={loading} type="submit" className='w-full'>Sign Up</Button>
                 </form>
            </Form>
                        <Button onClick={handleWithGoole} className='mt-10 w-full'>Login With Google <FcGoogle/></Button>
            
        </CardWrapper>
    )
}

export default SignUp