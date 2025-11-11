"use client";

import Footer from "../components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navbar from "../components/Navbar";

export default function AboutUs() {
  return (
    <>
    <Navbar/>
    <section className="px-6 dark:bg-gray-950 min-h-[700px] flex items-center justify-center py-12 md:px-12 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* About Us */}
        <Card className="bg-muted border-2 border-gray-950 dark:bg-gray-900 shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              About Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base md:text-lg text-muted-foreground">
              We are a passionate team of developers and data enthusiasts building powerful machine learning solutions to solve real-world problems. Our mission is to bridge the gap between AI technology and user-friendly applications that empower everyone to make smarter decisions.
            </p>
          </CardContent>
        </Card>

        {/* Contact Us */}
        <Card className="bg-muted border-2 border-gray-950 dark:bg-gray-900 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>
              📧 Email:{" "}
              <a
                href="mailto:shivamjindals2002@gmail.com"
                className="underline text-blue-600 dark:text-blue-400"
              >
                shivamjindals2002@gmail.com
              </a>
            </p>
            <p>📍 Location: 12/1 Sector 6 Faridabad, India</p>
          </CardContent>
        </Card>
      </div>
    </section>
    <Footer/>
    </>
  );
}
