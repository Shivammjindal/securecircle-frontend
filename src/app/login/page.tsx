"use client"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { BsGithub, BsArrowRight } from "react-icons/bs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { authClient, useSession } from "@/lib/auth-client"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect } from "react"
import Link from "next/link"


interface DataProps{
    name ?: string,
    email ?: string,
    password ?: string
}

export default function SignUp(){

    const form = useForm<DataProps>()
    const router = useRouter()
    const session = useSession()

    useEffect(() => {
        if(session?.data?.user?.email){
            router.push('/')
        }
    },[session])

    const handleGithubSignIn = async () => {

        await authClient.signIn.social({
            provider:'github',
            callbackURL:'/',
        })

        return toast.success('Sign Up Successfully')

    }

    const onSubmit = async (data : DataProps) => {

        if(!data.email || !data.password){
            return toast.error('Invalid Cresentials')
        }

        const { email, password} = data
        
        const response = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/",
        })

        if(!response?.data){
            toast.error('Invalid Credentials')
        }
        else{
            router.push('/')
            toast.success('Logged in successfully')
        }
    }

    return (
        <>
            <Navbar/>
            <div className="flex justify-center items-center min-h-screen  dark:bg-gray-950 p-4">
                <Card className="w-full max-w-sm rounded-2xl border border-blue-300 dark:border-blue-500 shadow-2xl dark:shadow-blue-900">
                    <CardHeader>
                        <CardTitle className="text-center text-3xl font-bold text-blue-700 dark:text-blue-400">
                            Login
                        </CardTitle>
                    </CardHeader>

                    <div className="self-center">
                        Do not have an acconunt? <Link className="text-blue-600 hover:underline" href={'/signup'}><span>Sign Up</span></Link>
                    </div>

                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                
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
                                    variant="outline"
                                    className="w-full flex items-center gap-2 justify-center border-blue-300 dark:border-blue-500 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-700"
                                    onClick={handleGithubSignIn}
                                    >
                                    <BsGithub className="w-5 h-5" />
                                        Continue with GitHub
                                    </Button>
                                </div>
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                                    Login <span><BsArrowRight strokeWidth={0.8} className=""/></span>
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