import React from 'react';
import { ArrowRight, Mail, Phone, MapPin, Trophy, ShieldCheck } from 'lucide-react';
import { CustomHeader } from '@/components/refine-ui/layout/custom-title';
import heroImageSrc from '../../public/images/uoc_building.jpg';
import { ThemeToggle } from '@/components/refine-ui/theme/theme-toggle';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <CustomHeader />
          </a>
          
          <nav className="flex items-center gap-4">
            <a 
              href="/login" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-primary h-9 px-4 py-2"
            >
              Sign In
            </a>
            <a 
              href="/register" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 transition-colors"
            >
              Get Started
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-20 lg:py-32 border-b">
          <div className="container mx-auto px-4 sm:px-6 grid gap-12 lg:grid-cols-2 items-center">
            
            <div className="flex flex-col space-y-6 text-center lg:text-left">
              <div className="inline-flex self-center lg:self-start items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground">
                University of Colombo Physical Education Department
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-balance">
                Manage Sports, Facilities & Equipment in One Place
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px] mx-auto lg:mx-0">
                Welcome to the central hub for campus athletics. Book venues, track sports inventories, register for teams, and schedule activities smoothly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <a 
                  href="/register" 
                  className="inline-flex items-center justify-center gap-2 rounded-md text-base font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8 transition-colors"
                >
                  Create an Account
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a 
                  href="#about" 
                  className="inline-flex items-center justify-center rounded-md text-base font-medium border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-11 px-8 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="relative mx-auto lg:ml-auto w-full max-w-[550px] aspect-[4/3] rounded-xl overflow-hidden border shadow-2xl bg-muted">
              <img 
                src={heroImageSrc} 
                alt="University of Colombo Physical Education Gym Facility" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
            </div>

          </div>
        </section>

        {/* VISION & MISSION SECTION */}
        <section className="py-20 bg-muted/30 border-b">
          <div className="container mx-auto px-4 sm:px-6 grid gap-8 md:grid-cols-2">
            <div className="flex flex-col p-8 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To promote health, fitness, and structural excellence by providing premier athletic resources, competitive sports integration, and managed facilities that empower every student to lead an active, balanced academic life.
              </p>
            </div>

            <div className="flex flex-col p-8 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Trophy className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become a benchmark collegiate sports division recognized for holistic student-athlete development, transparent resource administration, and cultivating a vibrant community driven by sportsmanship and physical literacy.
              </p>
            </div>
          </div>
        </section>

        {/* ABOUT US SECTION */}
        <section id="about" className="py-20 border-b">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About the Department</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The University Physical Education Department is committed to fostering physical wellness and managing the institution's athletic landscape. Our staff oversees multiple multi-sport complexes, track and field arrangements, indoor courts, and regular collegiate tournaments. 
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Through this portal, students, staff, and coaches can instantly coordinate allocations, avoid scheduling conflicts, and view real-time data regarding availability of sports inventory gear and grounds spaces.
            </p>
          </div>
        </section>

        {/* CONTACT US SECTION */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Contact Us</h2>
              <p className="text-muted-foreground">Have questions about equipment rentals or court availability? Reach out directly.</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <Mail className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-sm text-muted-foreground">sports@university.edu</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <Phone className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-sm text-muted-foreground">+1 (555) 234-5678</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <MapPin className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold mb-1">Office Location</h3>
                <p className="text-sm text-muted-foreground">1st Floor, Indoor Gymnasium, University of Colombo</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} University Physical Education Department. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;