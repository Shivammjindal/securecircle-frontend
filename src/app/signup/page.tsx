"use client"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form"
import { BsGithub, BsArrowRight } from "react-icons/bs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useSession } from "@/lib/auth-client"
import { useEffect } from "react"

interface DataProps{
    name ?: string,
    email ?: string,
    password ?: string
}

export default function SignUp(){

    const session = useSession()
    const router = useRouter()

    const form = useForm<DataProps>()

    useEffect(() => {
        if(session?.data?.user?.email){
            router.push('/')
        }
    },[session])

    const handleGithubSignIn = async () => {
        
        try{
            await authClient.signIn.social({
                provider:'github',
                callbackURL:'/',
            })

            return toast.success('Sign Up Successfully')
        }
        catch(e:unknown){
            console.log(e)
            return toast.error('Unable to Login with Github')
        }

    }

    const onSubmit = async (data : DataProps) => {

        if(!data.email || !data.name || !data.password){
            return toast.error('Invalid Cresentials')
        }

        const { name, email, password} = data

        let toastId = '';
        
        await authClient.signUp.email({
                email,
                password,
                name,
            }, {
                onRequest: () => {
                    toastId = toast.loading('Vadidating and Saving Credentials Please Wait')
                },
                onSuccess: () => {
                    toast.dismiss(toastId)
                    toast.success('Sign Up Successfully')
                },
                onError: (ctx) => {
                    toast.error('An Error Occured')
                    alert(ctx.error.message);
                },
        });
        
        router.push('/')
    }

    return (
        <>
            <Navbar/>
            <div className="flex justify-center items-center min-h-screen  dark:bg-gray-950 p-4">
            
                <Card className="w-full max-w-sm rounded-2xl border border-blue-400 dark:border-blue-500 shadow-2xl dark:shadow-blue-700">
                    <CardHeader>
                        <CardTitle className="text-center text-3xl font-bold text-blue-700 dark:text-blue-500">
                            Sign Up
                        </CardTitle>
                    </CardHeader>

                    <div className="self-center">
                        Already have an acconunt? <Link className="text-blue-600 hover:underline" href={'/login'}><span>Login</span></Link>
                    </div>

                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    defaultValue={""}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className="text-blue-700 dark:text-blue-500">Name</FormLabel>
                                        <FormControl>
                                            <Input className="focus-visible:ring-0 focus-visible:outline-none" placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormDescription className="text-blue-700 dark:text-blue-500">
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    defaultValue={""}
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-blue-700 dark:text-blue-500">Email</FormLabel>
                                        <FormControl>
                                        <Input className="focus-visible:ring-0 focus-visible:outline-none" type="email" placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    defaultValue={""}
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-blue-700 dark:text-blue-500">Password</FormLabel>
                                        <FormControl>
                                            <Input className="focus-visible:ring-0 focus-visible:outline-none" type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <div className="mt-6 space-y-2">

                                    <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full flex items-center gap-2 justify-center border-blue-400 dark:border-blue-500 text-blue-900 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900"
                                    onClick={handleGithubSignIn}
                                    >
                                    <BsGithub className="w-5 h-5" />
                                        Continue with GitHub
                                    </Button>
                                </div>
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                                    Sign Up <span><BsArrowRight strokeWidth={0.8} className=""/></span>
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

            </div>
            <Footer/>
        </>
        
    )
}