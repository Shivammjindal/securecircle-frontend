"use client"
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {

  const router = useRouter()

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-white flex flex-col dark:bg-gray-950 items-center justify-center px-6">
        <div
          className="text-center"
        >
          <h1 className="mt-10 text-2xl md:text-3xl lg:text-5xl lg:-mt-20 mb-10 dark:text-blue-500 text-blue-600 font-bold tracking-tight ">
            Kidnapping Detection Platform
          </h1>
          <p className="text-gray-600 dark:text-white text-lg mb-8">
            A modern safety intelligence system that analyzes surroundings, behavior patterns, and real-time signals to ensure personal security.
          </p>

          <Card className="shadow-sm dark:bg-gray-900 border dark:border-gray-950 border-gray-200">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-blue-600">Quick Check</h2>
              <p className="text-sm text-gray-600">
                Click below and provide image or video for analysis
              </p>
              <div className="flex justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-500" onClick={() => {
                  router.push('/home')
                }}>Check for Kidnapping</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 max-w-3xl mx-auto">
            <div className="p-6 dark:bg-gray-900 rounded-2xl border bg-white shadow-sm">
              <h3 className="font-semibold text-blue-600 text-lg mb-2">Real-Time Alerts</h3>
              <p className="text-sm dark:text-white text-gray-600">Get instant alerts when risk patterns are detected in the environment.</p>
            </div>
            <div className="p-6 dark:bg-gray-900 rounded-2xl border bg-white shadow-sm">
              <h3 className="font-semibold text-blue-600 text-lg mb-2">Behavior Pattern Scan</h3>
              <p className="text-sm dark:text-white text-gray-600">Monitors movement and interactions to identify unusual activities.</p>
            </div>
            <div className="p-6 dark:bg-gray-900 rounded-2xl border bg-white shadow-sm">
              <h3 className="font-semibold text-blue-600 text-lg mb-2">Model-Based Safety Evaluation</h3>
              <p className="text-sm  dark:text-white text-gray-600">Safety evaluation is processed through a rigorously trained model for reliable risk interpretation.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
    
  );
}
