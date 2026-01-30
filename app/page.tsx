import { BeforeAfter } from "@/components/landingpage/BeforeAfter";
import { Benefits } from "@/components/landingpage/Benefits";
import { CTA } from "@/components/landingpage/CTA";
import { Features } from "@/components/landingpage/Features";
import { Footer } from "@/components/landingpage/Footer";
import { Hero } from "@/components/landingpage/Hero";
import { HowItWorks } from "@/components/landingpage/HowItWorks";
import { Navbar } from "@/components/landingpage/Navbar";
import { Pricing } from "@/components/landingpage/Pricing";
import { Testimonials } from "@/components/landingpage/Testimonials";

export default function Page() {
    return (
        <main className="min-h-screen bg-background overflow-x-hidden">
            <Navbar />
            <Hero />
            <Features />
            <Benefits />
            <BeforeAfter />
            <HowItWorks />
            <Pricing />
            <Testimonials />
            <CTA />
            <Footer />
        </main>
    );
}