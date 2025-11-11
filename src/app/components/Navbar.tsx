"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./Toggler"
import toast from "react-hot-toast"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

interface user {
    name ?: string,
    email ?: string,
}

export default function Navbar(){

    const session = authClient.useSession();
    const router = useRouter()

    const [loggedIn, setloggedIn] = useState(false)
    const [user, setUser] = useState<user | null>()

    useEffect(() => {
        if(session.data?.user){
            setloggedIn(true);
            setUser({
                name : session.data?.user.name as string,
                email : session.data?.user.email as string
            })
        }
    }, [session])

    const handleSignOut = async () => {
        await authClient.signOut()
        toast.success('Signed Out Successfully')
        router.replace('/login')
    }

    return (
        <nav className="w-full border-b bg-background shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-500">
                    Secure Circle
                </Link>

                <main className="flex gap-4 font-medium dark:text-white text-blue-700">
                    <Link href={"/about"}>
                        About Us
                    </Link>
                </main>
        
                <div className="flex gap-4 items-center">

                    {
                        loggedIn && <div className="font-medium dark:text-white text-blue-700">{ user?.name }</div>
                    }
                    <ModeToggle/>
                    {
                    !loggedIn && <Link href="/login">
                        <Button variant="outline" className="text-base">Login</Button>
                    </Link>}
                    {
                        !loggedIn && <Link href="/signup">
                            <Button className="text-base bg-blue-600 hover:bg-blue-700 text-white">
                                Signup
                            </Button>
                        </Link>
                    }
                    {
                    loggedIn && 
                        <Button onClick={handleSignOut} className="text-base bg-blue-600 hover:bg-blue-700 text-white">
                            Logout
                        </Button>
                    }
                </div>
            </div>
        </nav>
    )
}